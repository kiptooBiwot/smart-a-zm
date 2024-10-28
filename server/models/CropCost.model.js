const { Schema, model } = require('mongoose')

const cropCostSchema = new Schema({
  costPerUnit: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  unit: {
    type: Number,
    required: true,
    default: 50
  }
}, { timestamps: true })


module.exports = model('CropCost', cropCostSchema)