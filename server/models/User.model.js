const { Schema, model } = require('mongoose')
const Counter = require('./Counter.model')

const userSchema = new Schema(
  {
    customId: {
      type: String,
      unique: true
    },
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
      enum: ['admin', 'farmer', 'regulator', 'transporter', 'manufacturer', 'retailer', 'customer']
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
    mobileNumber: {
      type: String,
      trim: true
    },
    workNumber: {
      type: String,
      trim: true
    },
    homeNumber: {
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

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const seqNum = counter.seq;
    const digits = seqNum.toString().length;

    let paddingLength = 7 - digits;
    if (paddingLength < 0) paddingLength = 0;

    const paddedSeqNum = seqNum.toString().padStart(paddingLength + digits, '0');
    user.customId = `SF-${paddedSeqNum}`;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model('User', userSchema)
