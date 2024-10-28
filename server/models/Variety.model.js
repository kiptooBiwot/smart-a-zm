const { Schema, model } = require('mongoose')

const varietySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }

}, { timestamps: true })


module.exports = model('Variety', varietySchema)