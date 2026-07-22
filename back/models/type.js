const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photoUrl: { type: String },
  route: { type: String, enum: ['/soins', '/maquillage', '/epilation', '/mains-et-pieds'], required: true }
}, { timestamps: true })

module.exports = mongoose.model('Type', typeSchema)
