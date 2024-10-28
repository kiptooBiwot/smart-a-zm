const Crop = require('../models/Crop.model')
const createError = require('http-errors')
const path = require('path')
const fs = require('fs')
const { log } = require('console')

module.exports.cropControllers = {
  // @desc Get all crops
  // @route GET /api/v1/crops/
  // @access Public
  getAllCrops: async (req, res, next) => {
    try {
      const crops = await Crop.find().populate({ path: 'createdBy', select: 'firstName surname' })

      // console.log('CROPS:', crops.length);

      if (crops.length > 0) {
        res.status(200).json({ success: true, data: crops })
      } else {
        res.status(200).json({ message: 'No crops fround in the database.' })
      }

    } catch (error) {
      next(createError(500, 'Server Error'))
    }
  },

  // @desc Get single crop
  // @route GET /api/v1/crops/:id
  // @access Public
  getCropById: async (req, res, next) => {
    try {
      const crop = await Crop.findById(req.params.id).populate('varieties')
      if (!crop) return next(createError(404, 'Crop not found'))
      res.status(200).json({ success: true, data: crop })
    } catch (error) {
      next(createError(500, 'Server Error'))
    }
  },

  // @desc Create a new crop
  // @route POST /api/v1/crops/
  // @access Private
  createCrop: async (req, res, next) => {
    try {

      // console.log('REQ.FILE:', req.file);


      if (!req.file || req.file.length === 0) {
        return res.status(400).json({ message: 'A crop image is required. Please add the crop image.' });
      }

      // console.log('REQ.BODY:', req.body);
      // console.log('REQ.FiLE PATH:', req.file);

      const imagePath = ''
      if (req.file) {

        // console.log('REQ>FILE', req.file);
        // console.log('REQ>FILE', req.folderName);


        const folderName = req.folderName || 'crops'
        const relativePath = path.join('/uploads', folderName, req.file.filename)


        // imagePath = relativePath
        // console.log('RELATIVE PATH:', relativePath);
        // console.log('REQ.USER:', req.user)
        // console.log('REQ.body:', req.body)

        const newCrop = new Crop({
          ...req.body,
          cropImage: relativePath,
          createdBy: req.user.id
        })

        const savedCrop = await newCrop.save()
        res.status(201).json({ success: true, message: 'The new crop has been saved', data: savedCrop })
      }


      else {
        return res.status(500).json({ success: false, message: "A crop image is required" })
      }
    } catch (error) {
      console.log('ERROR:', error);

      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(val => val.message)
        return res.status(400).json({ success: false, errors })
      } else next(error)
    }
  },

  // @desc Update crop details
  // @route PUT /api/v1/crops/:id
  // @access Private
  updateCrop: async (req, res, next) => {
    try {
      // console.log('UPDATE THINGS:', req.body);
      // console.log('FILE:', req.file);
      const { name, varieties } = req.body;

      if (req.file) {
        // Delete existing image before updating
        const crop = await Crop.findById(req.params.id)

        if (!crop) {
          return res.status(404).json({ message: 'The crops seems was not found' })
        }

        // Remove leading slash to handle the relative path
        const relativeImagePath = crop.cropImage.startsWith('/') ? crop.cropImage.substring(1) : crop.cropImage;

        // Construct the full relative path
        const imagePath = path.join(__dirname, '..', relativeImagePath)


        // Delete the image file if it exists
        fs.unlink(imagePath, (err) => {
          if (err) {
            // console.log('Error deleting image file:', err);

            return res.status(500).json({ message: 'Failed to delete the crop image.' })
          }
        })


        // UPDATE the new image 
        const folderName = req.folderName || 'crops'
        const relativePath = path.join('/uploads', folderName, req.file.filename)

        // console.log('WE HAVE AN IMAGE');

        const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, { name, varieties, cropImage: relativePath }, { new: true, runValidators: true })

        if (!updatedCrop) {
          return res.status(404).json({ message: 'Crop not found' });
        }

        res.status(200).json({ message: 'The crop has been updated', data: updatedCrop })
      } else {
        console.log('NO IMAGE HERE!');

        const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, { name, varieties }, { new: true, runValidators: true })

        if (!updatedCrop) {
          return res.status(404).json({ message: 'Crop not found' })
        }

        res.status(200).json({ message: 'The crop has been updated', data: updatedCrop })
      }

    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(val => val.message)
        return res.status(400).json({ success: false, errors })
      } else {
        next(createError(500, error))
      }
    }
  },

  // @desc Delete a crop
  // @route DELETE /api/v1/crops/:id
  // @access Private
  deleteCrop: async (req, res, next) => {
    try {

      const crop = await Crop.findById(req.params.id)

      if (!crop) {
        return res.status(404).json({ message: 'The crops seems to have been already deleted' })
      }

      // Remove leading slash to handle the relative path
      const relativeImagePath = crop.cropImage.startsWith('/') ? crop.cropImage.substring(1) : crop.cropImage;

      // Construct the full relative path
      const imagePath = path.join(__dirname, '..', relativeImagePath);

      // Find the crop by ID and delete it
      await Crop.findByIdAndDelete(req.params.id)

      // Delete the image file if it exists

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log('Error deleting image file:', err);

          return res.status(500).json({ message: 'Failed to delete the crop image.' })
        }
      })

      res.status(200).json({ success: true, message: 'The crop has been successfully deleted' })
    } catch (error) {
      console.log('eRROR: ' + error.message);

      next(createError(500, 'Failed to delete the crop and its image'))
    }
  },

}