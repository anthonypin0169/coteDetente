const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, enum: ['soins', 'epilation', 'maquillage', 'mains-pieds', 'evenement'], required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
