const GiftCard = require('../models/giftCard');
const GiftCardPage = require('../models/giftCardPage');
const Counter = require('../models/counter');
const path = require('path');
const fs = require('fs');
const { sendGiftCardEmails } = require('../services/mailer');
const { generateGiftCardImage } = require('../services/giftCardImage');

// Le premier bon porte le numéro 10422
const FIRST_GIFT_CARD_NUMBER = 10422;

const nextGiftCardNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'giftCard' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );
  return FIRST_GIFT_CARD_NUMBER - 1 + counter.seq;
};

exports.finalizePaidGiftCard = async (data, stripeSessionId) => {
  let generatedImagePath = null;

  try {
    // Webhook déjà traité pour ce paiement : rien à refaire
    if (stripeSessionId && await GiftCard.exists({ stripeSessionId })) return null;

    const number = await nextGiftCardNumber();
    const giftCard = await GiftCard.create({ ...data, number, stripeSessionId, isPaid: true });

    const giftCardPage = await GiftCardPage.findOne();
    let templatePath = giftCardPage?.photoUrl
      ? path.join('uploads', path.basename(giftCardPage.photoUrl))
      : null;

    if (templatePath) {
      generatedImagePath = await generateGiftCardImage(templatePath, {
        amount: giftCard.amount,
        recipientName: giftCard.recipientName,
        message: giftCard.message
      });
      templatePath = generatedImagePath;
    }

    await sendGiftCardEmails({
      number: giftCard.number,
      senderName: giftCard.senderName,
      senderEmail: giftCard.senderEmail,
      senderPhone: giftCard.senderPhone,
      recipientName: giftCard.recipientName,
      amount: giftCard.amount,
      message: giftCard.message,
      templatePath
    });

    return giftCard;
  } finally {
    if (generatedImagePath && fs.existsSync(generatedImagePath)) fs.unlinkSync(generatedImagePath);
  }
};

exports.createGiftCard = async (req, res) => {
  try {
    const giftCard = await exports.finalizePaidGiftCard(req.body);
    res.status(201).json(giftCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGiftCards = async (req, res) => {
  try {
    const giftCards = await GiftCard.find();
    res.json(giftCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
