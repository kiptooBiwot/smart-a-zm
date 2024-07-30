const { farmerControllers } = require('../controllers/Farmer.controllers')

const router = require('express').Router()

router.post('/details', farmerControllers.farmerDetails)


module.exports = router