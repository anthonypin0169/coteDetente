const mongoose = require('mongoose')

const sousTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  intro: { type: String },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }
}, { timestamps: true })

module.exports = mongoose.model('SousType', sousTypeSchema)
