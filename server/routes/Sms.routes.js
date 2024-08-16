const { smsControllers } = require('../controllers/Sms.controllers')

const router = require('express').Router()

router.post('/', smsControllers.sendSms)

module.exports = router