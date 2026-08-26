const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  employeeName: { type: String },
  description: { type: String },
  photoUrl: { type: String },
  secondPhotoUrl: { type: String },
  thirdPhotoUrl: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
