const mongoose = require('mongoose')

const highlightCardSchema = new mongoose.Schema({
  photoUrl: { type: String },
  photoAlt: { type: String },
  srcSet: { type: String },
  frontTitle: { type: String, required: true },
  frontText: { type: String },
  backTitle: { type: String },
  backText: { type: String },
  redirectTo: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('HighlightCard', highlightCardSchema)
