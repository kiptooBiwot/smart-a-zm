const { authControllers } = require('../controllers/Auth.controllers')
const upload = require('../helpers/multer.helper')
const router = require('express').Router()


router.post('/register', authControllers.registerUser)

router.post('/signin', authControllers.signin)

router.patch('/:id', upload.single('image'), authControllers.updateProfile)

router.delete('/logout', authControllers.logout)

module.exports = router