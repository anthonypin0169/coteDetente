const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String, required: true },
  photoAlt: { type: String },
  category: { type: String, enum: ['soins', 'epilation', 'maquillage', 'mains-pieds', 'evenement', 'carrousel-hero', 'carrousel-institut'], required: true },
  description: { type: String },
  dates: { type: String },
  textColor: { type: String, enum: ['white', 'black'], default: 'white' },
  textPositions: {
    title: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 40 }
    },
    dates: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 55 }
    },
    description: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 65 }
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
