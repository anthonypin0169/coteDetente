const mongoose = require('mongoose')

const giftCardPageSchema = new mongoose.Schema({
  title: { type: String },
  shortText: { type: String },
  photoUrl: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('GiftCardPage', giftCardPageSchema)
