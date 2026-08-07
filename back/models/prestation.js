const mongoose = require('mongoose')

const prestationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String },
  duration: { type: String },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Prestation', prestationSchema)
