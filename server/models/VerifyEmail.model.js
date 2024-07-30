const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const tokenSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  // createdAt: {
  //   type: Date,
  //   index: true,
  //   default: Date.now,
  //   expires: '3m'
  // }
}, { timestamps: true })

// tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 })

// encrypt the token
// tokenSchema.pre('save', async function (next) {
//   if (this.isModified('token')) {
//     const hash = await bcrypt.hash(this.token, 8)
//     this.token = hash
//   }

//   next()
// })

// Compare the tokens
// tokenSchema.methods.comparePassword = async function (token) {
//   const result = await bcrypt.compareSync(token, this.token)
//   return result
// }

module.exports = model('token', tokenSchema)