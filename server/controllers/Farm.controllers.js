const createError = require('http-errors')
const Farm = require('../models/Farm.model')
const cloudinary = require('../helpers/cloudinary.helper')

module.exports.farmControllers = {


  // @desc Get all farms
  // @route /api/farm/
  // @access private
  getAllFarms: async (req, res, next) => {

    try {
      const farms = await Farm.find()

      if (!farms) {
        throw createError[404]('Opps, no registered farms found')
      }

      res.status(200).json(farms)
    } catch (error) {
      next(error)
    }
  },


  // @desc Create a new farm
  // @route /api/farm/
  // @access private
  createFarm: async (req, res, next) => {
    try {
      const farmDetails = req.body
      // console.log('REQ.BODY', req.body)
      // console.log('REQ.USER', req.user.id)

      let savedURI = null

      if (req.file) {
        const file = req.file
        const { path } = file

        const imageURI = await cloudinary.uploader.upload(path, {
          folder: "AVN"
        })

        savedURI = imageURI.secure_url
        // console.log('SAVED URI', savedURI)
      }

      const newFarm = new Farm({
        ...farmDetails,
        farmLogo: savedURI,
        userId: req.user.id
      })
      await newFarm.save()
      res.status(201).json({ message: 'Farm created successfully!', newFarm })

    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}