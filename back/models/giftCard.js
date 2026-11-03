const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
  number: { type: Number, unique: true, sparse: true },
  // Session Stripe à l'origine du bon : évite de créer deux bons si Stripe renvoie le webhook
  stripeSessionId: { type: String, unique: true, sparse: true },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderPhone: { type: String },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String },
  amount: { type: Number, required: true },
  message: { type: String },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('GiftCard', giftCardSchema);
