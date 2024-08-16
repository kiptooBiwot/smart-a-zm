
module.exports.smsControllers = {
  sendSms: async (req, res, next) => {

    try {
      let { phone, message } = req.body

      const farmerNumbers = phone


      const credentials = {
        apiKey: process.env.AFRICASTALKING_API_KEY,
        username: process.env.AFRICASTALKING_USERNAME
      }

      const AfricasTalking = require('africastalking')(credentials)


      const sms = AfricasTalking.SMS
      // farmerNumbers = ['+254723114297', '+254725587783']
      // farmerNumbers = ['+254750134366']
      // message = "SMART-A test message."



      const options = {
        to: Array.isArray(farmerNumbers) ? [...farmerNumbers] : farmerNumbers,
        message,
        from: 'AegirLtd'
      }


      sms.send(options)
        .then(response => {
          // console.log('SUCCESS:', response)
          res.json({ message: 'Response from SMS sending', response })
        })
        .catch(error => {
          console.log(error);
          next(error)
        })
    } catch (error) {
      // console.log('ERROR:', error);
      next(error)
    }
  }
}

