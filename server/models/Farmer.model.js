const { model, Schema } = require('mongoose')

const farmerSchema = Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  idNumber: {
    type: String,
    trim: true
  },

  // Farmer Details
  maritalStatus: {
    type: String,
    trim: true
  },
  householdMembers: {
    type: Number,
    trim: true
  },
  ageGroup: {
    type: String,
    trim: true
  },
  foodSecurity: {
    type: String,
    trim: true
  },
  averageIncome: {
    type: Number,
    required: true,
    trim: true
  },
  marketingPlatform: {
    type: String,
    trim: true
  },
  farmingExperience: {
    type: String,
    trim: true
  },
  climateChange: {
    type: String,
    trim: true
  },
  languages: {
    type: String,
    trim: true
  },
  educationLevel: {
    type: String,
    trim: true
  },
  wasteManagement: {
    type: String,
    trim: true
  },
  usedDigitalEconomy: {
    type: String,
    trim: true
  },
  ownSmartPhone: {
    type: String,
    trim: true
  },
  phoneUse: [
    {
      type: String,
      trim: true
    }
  ],

  // Farm Details
  landAcrage: {
    type: Number,
    trim: true
  },
  landOwnership: {
    type: String,
    required: true,
    trim: true
  },
  geocoordinates: {
    longitude: {
      type: Number,
      trim: true
    },
    latitude: {
      type: Number,
      trim: true
    },
  },
  cropHistory: [
    {
      crop: {
        type: String,
        required: true,
        trim: true
      },
    },
  ],
}, { timestamps: true })

module.exports = model('FarmDetail', farmerSchema)