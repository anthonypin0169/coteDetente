const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  photoUrl: { type: String },
  sousType: { type: mongoose.Schema.Types.ObjectId, ref: 'SousType', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Group', groupSchema)
