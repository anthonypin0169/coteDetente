const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  employeeName: { type: String },
  description: { type: String },
  recapDescription: { type: String },
  isCurrent: { type: Boolean, default: false },
  photoUrl: { type: String },
  photoAlt: { type: String },
  srcSet: { type: String },
  textColor: { type: String, enum: ['white', 'black'], default: 'white' },
  textPositions: {
    title: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 30 }
    },
    dates: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 45 }
    },
    description: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 60 }
    },
    employeeName: {
      x: { type: Number, default: 85 },
      y: { type: Number, default: 90 }
    }
  }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
