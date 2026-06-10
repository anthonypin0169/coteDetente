const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('GiftCard', giftCardSchema);
