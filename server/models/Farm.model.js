const { Schema, model } = require('mongoose')


const farmSchema = new Schema({
  farmName: {
    type: String,
    trim: true,
  },
  farmLogo: {
    type: String
  },
  farmDescription: {
    type: String,
    trim: true,
  },
  farmOwnership: {
    type: String,
    required: true,
    trim: true,
    enum: ['self-owned', 'rented'],
  },
  farmAcreage: {
    type: Number,
    required: true,
    trim: true,
  },
  farmWaterSource: {
    type: String,
    trim: true,
  },
  isFarmIrrigated: {
    type: Boolean,
    default: false,
  },
  handleFarmWasteMgt: {
    type: Boolean,
    default: false,
  },
  wasteManagementDescription: {
    type: String,
    trim: true,
  },
  farmFertilizer: {
    type: String,
    trim: true,
  },
  isFarmStructures: { type: Boolean, default: false },
  farmStructures: { type: Array },
  farmEmployees: { type: Number },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
}, { timestamps: true })

module.exports = model('Farm', farmSchema)