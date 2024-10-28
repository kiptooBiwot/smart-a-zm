const { cropControllers } = require('../controllers/Crop.controllers')
const { verifyAccessToken, authorize } = require('../helpers/jwt.helpers')
const upload = require('../middlewares/multer.middleware')

const router = require('express').Router()


router.get('/', cropControllers.getAllCrops)

router.get('/:id', cropControllers.getCropById)

router.post('/', verifyAccessToken, authorize('admin'), upload.singleUpload('crops', 'image'), cropControllers.createCrop)

router.put('/:id', upload.singleUpload('crops', 'image'), cropControllers.updateCrop)

router.delete('/:id', verifyAccessToken, authorize('admin'), cropControllers.deleteCrop)
// verifyAccessToken, authorize('admin'),

module.exports = router