const mongoose = require('mongoose')

const prestationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String },
  sousType: { type: mongoose.Schema.Types.ObjectId, ref: 'SousType', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Prestation', prestationSchema)
