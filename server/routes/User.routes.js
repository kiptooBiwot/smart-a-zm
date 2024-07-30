const { userControllers } = require('../controllers/User.controllers')
const { verifyAccessToken } = require('../helpers/jwt.helpers')

const router = require('express').Router()

router.get('/', userControllers.getUsers)

router.get('/me', verifyAccessToken, userControllers.getMyProfile)

router.get('/:id/verify/:token', userControllers.verifyToken)

router.get('/verify/:email', userControllers.checkEmailVerification)

// router.post('/business-info', verifyAccessToken, userControllers.updateProfile)

router.post('/business-info/:id', userControllers.registerBusiness)

module.exports = router