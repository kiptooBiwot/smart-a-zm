const createError = require('http-errors')
const FarmDetails = require('../models/Farmer.model')

module.exports.farmerControllers = {
  // @desc Register a user
  // @route POST/api/v1/auth
  // @access Public
  farmerDetails: async (req, res, next) => {
    try {
      console.log(req.body);
      // const response = await FarmDetails.find()

      //TODO: Save farm details to db **** Work on Crops planted on front-end

      res.status(201).json({ mesasge: 'Farmer details saved successfully!' })
    } catch (error) {
      next(error)
    }
  }
}