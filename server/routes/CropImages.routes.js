const { cropImagesControllers } = require('../controllers/CropImages.controllers')
const { verifyAccessToken } = require('../helpers/jwt.helpers')

const router = require('express').Router()
const upload = require('../middlewares/multer.middleware')


router.get('/', cropImagesControllers.getCropImages)

// router.post('/', verifyAccessToken, upload.multipleUpload('crops', 'images'), cropImagesControllers.createCropImages)

router.post('/', upload.multipleUpload('crops', 'images'), cropImagesControllers.createCropImages)

router.get('/:id', cropImagesControllers.getSingleCropImage)
// router.delete('/:id', verifyAccessToken, cropImagesControllers.deleteCropImage)
router.delete('/:id', cropImagesControllers.deleteCropImage)

module.exports = router