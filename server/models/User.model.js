const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      // required: [true, 'Your first name is required'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    surname: {
      type: String,
      // required: [true, 'Your first surname is required'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    dob: {
      type: Date
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password cannot be blank'],
    },
    profileImage: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: 'farmer',
      lowercase: true,
      enum: ['admin', 'farmer', 'transporter', 'manufacturer', 'retailer', 'customer']
    },
    gender: {
      type: String,
      trim: true,
      enum: ['male', 'female', 'other']
    },
    isEnabled: {
      type: Boolean,
      default: false
    },
    mobile_number: {
      type: String,
      trim: true
    },
    work_number: {
      type: String,
      trim: true
    },
    home_number: {
      type: String,
      trim: true
    },
    profileImage: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true
    },
    acceptTerms: {
      type: Boolean,
      // required: true
    },
    title: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
