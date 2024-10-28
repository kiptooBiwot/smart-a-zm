const CropImage = require('../models/CropImages.model')
const createError = require('http-errors')
const path = require('path')
const fs = require('fs')

module.exports.cropImagesControllers = {

  // @desc Get all cropImages
  // @route GET /api/v1/cropImages
  // @access Public
  // @todo Add pagination and sorting options to the query parameters.
  getCropImages: async (req, res, next) => {
    try {

      const allImages = await CropImage.find()

      if (allImages.length < 1) {
        throw createError(404, 'No images found. It seems that there are no crop images uploaded yet. You might want to upload images.')
      }
      res.json({ images: allImages });
    } catch (error) {
      next(error)
    }
  },

  // @desc Add new cropImages
  // @route POST /api/v1/cropImages
  // @access Private
  createCropImages: async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded!' });
      }

      if (req.files) {

        console.log('FOLDER NAME REQ.FOLDER :', req.folderName);

        const images = []

        for (let file of req.files) {

          // To get the relative path add the folder name
          const folderName = req.folderName || 'crops'
          const relativePath = path.join('/uploads', folderName, file.filename);

          // store the file path in the database
          const cropImage = new CropImage({
            filename: file.filename,
            path: relativePath,
            size: file.size,
          });
          const savedImage = await cropImage.save()
          images.push(savedImage);
        }

        // if (savedImage) {
        res.status(201).json({
          message: 'Images uploaded successfully',
          files: images,
        });
        // }
      }
    } catch (error) {
      next(error);
    }
  },


  // @desc Get a single cropImage
  // @route GET /api/v1/cropImages/:id
  // @access Public
  getSingleCropImage: async (req, res, next) => {
    try {
      const cropImage = await CropImage.findById(req.params.id);

      if (!cropImage) {
        throw createError(404, 'Image not found.');
      }

      res.json({ cropImage })
    } catch (error) {
      next(error)
    }
  },

  // @desc Delete a crop Image
  // @route DELETE /api/v1/cropImages/:id
  // @access Public
  deleteCropImage: async (req, res, next) => {
    try {

      const imageToDelete = await CropImage.findById(req.params.id)

      // console.log(imageToDelete);

      if (!imageToDelete) {
        throw createError[404]('Image not found. The image could have been deleted');
      }

      if (imageToDelete) {

        const filePath = path.join(__dirname, '..', imageToDelete.path)


        // console.log('DELETING file at:', filePath);

        if (fs.existsSync(filePath)) {

          fs.unlink(filePath, (err) => {
            if (err) {
              // console.log('ERROR', err);

              throw createError(500, 'Error deleting image');
            }
            // res.json({ message: 'Image deleted successfully' })
          })
        } else {
          return res.status(404).json({ message: 'Image not found' })
        }

        await imageToDelete.remove()

        res.status(200).json({ message: 'Image deleted successfully' });
      }
    } catch (error) {
      next(error)
    }
  },


}