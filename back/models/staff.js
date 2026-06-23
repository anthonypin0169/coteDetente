const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String },
  text: { type: String },
  photoUrl: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Staff', staffSchema)
