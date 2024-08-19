const router = require('express').Router()
const { farmControllers } = require('../controllers/Farm.controllers')
const { verifyAccessToken } = require('../helpers/jwt.helpers')
const upload = require('../helpers/multer.helper')


router.post('/', verifyAccessToken, upload.single('file'), farmControllers.createFarm)

router.get('/', verifyAccessToken, farmControllers.getAllFarms)

module.exports = router