const { Schema, model, default: mongoose } = require('mongoose')

const BusinessSchema = Schema({
  businessOwner: {
    type: mongoose.Types.ObjectId, ref: 'User',
    required: [true, 'Business owner id must be availed']
  },
  businesstype: {
    type: String,
    trim: true
  },
  businessName: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  addressOne: {
    type: String,
    trim: true
  },
  zip: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  province: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
},
  { timestamps: true })

module.exports = model('Business', BusinessSchema)