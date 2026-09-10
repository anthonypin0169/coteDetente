const mongoose = require('mongoose')

const contactPageSchema = new mongoose.Schema({
  photoUrl: { type: String },
  photoAlt: { type: String },
  srcSet: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('ContactPage', contactPageSchema)
