const { Schema, model } = require('mongoose')

const cropSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  varieties: {
    type: Array,
    required: true
  },
  // cropImages: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'cropImage',
  //     required: true
  //   }
  // ],
  cropImage: {
    type: String,
    required: true,
    trim: true
  },
  costOverTime: [
    {
      type: Schema.Types.ObjectId,
      required: false
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true })

module.exports = model('Crop', cropSchema)