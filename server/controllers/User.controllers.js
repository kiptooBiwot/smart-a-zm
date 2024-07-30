const createError = require('http-errors')
const { TokenExpiredError } = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const BusinessModel = require('../models/Business.model')
const Business = require('../models/Business.model')
const User = require('../models/User.model')
const VerifyEmail = require('../models/VerifyEmail.model')
const sendEmail = require('../helpers/sendEmail')

module.exports.userControllers = {
  // @desc Get all users
  // @route GET/api/v1/users
  // @access Private
  getUsers: async (req, res, next) => {
    res.json({ message: 'All users here!' })
  },

  // @desc Get a particular user
  // @route GET/api/v1/users/:id
  // @access Private

  getMyProfile: async (req, res, next) => {
    console.log(`REQ.USER: ${req.user.email}`)
    const oneUser = await User.findOne({ email: req.user.email });

    console.log(oneUser)
    try {
      if (!oneUser) throw createError.NotFound("The user is not registered.");

      res.status(200).json({
        user: oneUser,
      });
    } catch (error) {
      next(error);
    }
  },

  // @desc Email verification of the code
  // @route GET /api/v1/users//:id/verify/:token
  // @access Public
  verifyToken: async (req, res, next) => {
    try {
      const userId = req.params.id
      const code = req.params.token
      // Ensure id and token are not missing
      if (!userId && !code) throw createError.NotFound('Invalid request, missing parameters')
      // Check if id is a valid mongoDB id
      if (!isValidObjectId(userId)) throw createError(500, 'Invalid user id')

      const user = await User.findOne({ _id: userId })

      console.log(`USER: ${user}`)


      if (!user) throw createError.NotFound('Invalid code, try again')

      const token = await VerifyEmail.findOne({
        // userId: user._id,
        token: code
      })

      if (!token) throw createError.NotFound('Invalid code, try again')

      const userUpdated = await User.findOneAndUpdate(
        {
          _id: user._id
        },
        {
          verified: true
        },
        {
          new: true
        }
      )

      if (!userUpdated) throw createError(500, 'Update failed!')

      await token.remove()

      res.status(200).json({ message: 'Email verified successfully' })

    } catch (error) {
      next(error)
    }
  },


  // @desc Update business information
  // @route PUT /api/v1/users/business-info
  // @access Public@desc Update business information
  checkEmailVerification: async (req, res, next) => {
    try {
      // const credentials = req.body
      const email = req.params.email

      // console.log(email)

      const response = await User.findOne({ email: email })

      console.log(response.verified)

      if (!response.verified) {
        // Run the logic to send a new token to the user
        // check if email is registered
        // const user = await User.findOne({ email });

        // if (!user) throw createError.Forbidden("Invalid email and/or password");

        // Check if user is verified. If not send email verification link
        // if (!user.verified) {

        // Delete the exisiting token in the db and create a new one
        const deletedToken = await VerifyEmail.findOneAndRemove({ userId: response._id })

        console.log(`Existing token deleted! ${deletedToken}`)

        // Generate a new four digit number 'OTP' and send to the user's email
        let otp = Math.floor(1000 + Math.random() * 9000)
        console.log(`OTP: ${otp}`)

        // Send email verification token
        const tokenCode = new VerifyEmail({
          userId: response._id,
          token: otp
        })

        // console.log(`TOKEN WITH USER ID: ${tokenCode}`)

        const savedToken = await tokenCode.save()

        if (!savedToken) throw createError.InternalServerError('Token not saved!')


        console.log(`SAVED TOKEN: ${savedToken}`)
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
              <h4>Hello, ${response.firstName} </h4>
              
              <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">Thank you very much for registering with Africa Value Chain Network.</h1>
              <p>Please verify your email to access the platform. Your verification code is:</p>
              <h2 style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px;">${savedToken.token}</h2>

              <h5 style="color: #F87171;">This link expires in an hour's time.</h5>
              <p>Kind regards,</p>
              <h5>Africa Value Chain Network</h5>
            </div>
      </body>
      </html>
    `

        await sendEmail(response.email, 'Africa Value Chain Network (A.V.N) - Verify Your Email', emailContent)

        // return res.status(200).json({ message: 'Your email is not verified. An email sent to your account, please verify', user: response })

        return res.status(200).json({ flag: 'NOT_VERIFIED', message: 'Sorry, your email is not verified.', user: response })
        // }


        // return res.status(200).json({ flag: 'NOT_VERIFIED', message: 'Sorry, your email is not verified.', user: response })
      }

      res.status(200).json({ flag: 'EMAIL_VERIFIED', user: response })


    } catch (error) {
      next(error)
    }
  },


  // @route PUT /api/v1/users/business-info
  // @access Public
  registerBusiness: async (req, res, next) => {
    try {
      // console.log(`FROM BODY: ${req.body}`)
      const user_id = req.params.id
      const businessInfo = req.body

      // console.log(businessInfo)
      // console.log(user_id)

      const newBusiness = new Business({
        businessOwner: user_id,
        businessInfo
      })

      const savedBusiness = await newBusiness.save()

      if (!savedBusiness) throw createError(500, 'Business not saved. Try again.')

      res.status(201).json({
        message: 'Business saved successfully',
        savedBusiness
      })

    } catch (error) {
      next(error)
    }
  }
}