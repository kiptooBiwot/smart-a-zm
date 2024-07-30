const createError = require('http-errors')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('../helpers/cloudinary.helper')
const VerifyEmail = require('../models/VerifyEmail.model')
const sendEmail = require('../helpers/sendEmail')
const crypto = require('crypto')

const { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../helpers/jwt.helpers')


module.exports.authControllers = {
  // @desc Register a user
  // @route POST/api/v1/auth
  // @access Public

  registerUser: async (req, res, next) => {
    try {
      console.log('BODY', req.body);
      const { email, password } = req.body
      const userExists = await User.findOne({ email })

      if (userExists) throw createError.Conflict(`${userExists.email} already taken. Do you want to sign in instead?`)

      // Hash the password
      const salt = await bcrypt.genSaltSync(10)
      const hashedPassword = await bcrypt.hashSync(password, salt)

      const newUser = new User({
        email,
        password: hashedPassword
      })

      const savedUser = await newUser.save()


      // Generate a token for the registered user
      // Generate a token and refresh token
      const accessToken = await signAccessToken(savedUser);
      const refreshToken = await signRefreshToken(savedUser);

      // console.log(user)

      res.header("x-access-token", accessToken).status(201).json({
        userId: savedUser._id,
        message: `Registration successful`,
        token: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`
      });

    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  // @desc Update user profile
  // @route PUT /api/v1/signin/:id
  // @access Public
  updateProfile: async (req, res, next) => {
    try {
      // console.log('WE ARE hitting THE COntrollers!')
      const user_details = req.body
      const user_id = req.params.id

      // Check if user exists before saving anything yet
      const userExists = await User.findById(user_id)

      if (!userExists) throw createError(404, 'The account profile you\'re updating does not exist.')

      // console.log('REQ>BODY:', req.body)
      // console.log('REQ.FILE:', req.file)
      let savedURI = null

      if (req.file) {
        const file = req.file
        const { path } = file

        const imageURI = await cloudinary.uploader.upload(path, {
          folder: "AVN"
        })
        // console.log(`IMAGE URI FROM CLoudinary: ${imageURI}`)
        savedURI = imageURI.secure_url
        // console.log(`Image URIs: ${savedURI}`)
      }

      // UPDATE user account

      const updatedAccount = await User.findByIdAndUpdate(
        { _id: userExists._id },
        { ...req.body, profileImage: savedURI },
        { new: true }
      )

      // console.log(updatedAccount)

      if (!updatedAccount) throw createError(500, 'Data not saved, please try again')

      // Generate a four digit number 'OTP'
      let otp = Math.floor(1000 + Math.random() * 9000)
      // console.log(`OTP: ${otp}`)

      // Send email verification token
      const tokenCode = new VerifyEmail({
        userId: userExists._id,
        token: otp
      })

      // console.log(`TOKEN WITH USER ID: ${tokenCode}`)

      const savedToken = await tokenCode.save()

      if (!savedToken) throw createError.InternalServerError('Token not saved!')


      // console.log(`SAVED TOKEN: ${savedToken}`)
      // console.log(`UPDATED EMAIL: ${updatedAccount.email}`)
      const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media only screen and (max-width: 620px) {
            h1 {
              font-size: 20px;
              padding: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727">
              <h4>Hello, ${updatedAccount.firstName} </h4>
              
              <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">Thank you very much for registering with Smart-A.</h1>
              <p>Please verify your email to access the platform. Your verification code is:</p>
              <h2 style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px;">${savedToken.token}</h2>

              <h5 style="color: #F87171;">This link expires in an hour's time.</h5>
              <p>Kind regards,</p>
              <h5>Smart-A</h5>
            </div>
      </body>
      </html>
    `

      await sendEmail(updatedAccount.email, 'SMART-A Registration - Verify Your Email', emailContent)

      res.status(201).json({
        message: 'Profile information saved successfully.',
        updatedAccount
      })


    } catch (error) {
      next(error)
    }
  },

  // @desc Sign in a user
  // @route POST/api/v1/signin
  // @access Public
  signin: async (req, res, next) => {
    try {
      // validate inputs from the user
      // const validatedCredentials = await loginSchema.validateAsync(req.body);
      const { email, password } = req.body

      if (!email && !password) throw createError.NotFound('Email and password fields must be filled!')

      // Check if user exists on the database
      const user = await User.findOne({ email })

      if (!user) throw createError.Forbidden('User not found, you may want to register an account')


      // check password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );

      // console.log(`Is password Valid? ${isPasswordValid}`);

      if (!isPasswordValid)
        throw createError.Forbidden("Invalid email and/or password");

      const accessToken = await signAccessToken(user);
      const refreshToken = await signRefreshToken(user);

      res.header("x-access-token", accessToken).status(200).send({
        message: `Log in successful`,
        token: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
        user
      });
    } catch (error) {
      next(error);
    }
  },

  // REFRESH TOKEN
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      // get user from db
      const user = await User.findOne({ _id: userId });

      const accessToken = await signAccessToken(user);
      const refreshedToken = await signRefreshToken(user);

      res.send({
        token: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshedToken}`,
      });
    } catch (error) {
      next(error);
    }
  },

  // LOG OUT
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      // console.log(req.body);
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      // console.log(`USER_ID: ${userId}`);
      // Delete the refresh token from Redis
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err);
          throw createError.InternalServerError();
        }

        // console.log(val);
        res.send({
          message: "Logged out!",
        });
      });
    } catch (error) {
      next(error);
    }
  },
}