const GiftCard = require('../models/giftCard');
const GiftCardPage = require('../models/giftCardPage');
const path = require('path');
const { sendGiftCardEmails } = require('../services/mailer');

exports.createGiftCard = async (req, res) => {
  try {
    const giftCard = await GiftCard.create(req.body);

    const giftCardPage = await GiftCardPage.findOne();
    const templatePath = giftCardPage?.photoUrl
      ? path.join('uploads', path.basename(giftCardPage.photoUrl))
      : null;

    await sendGiftCardEmails({
      senderName: giftCard.senderName,
      senderEmail: giftCard.senderEmail,
      recipientName: giftCard.recipientName,
      amount: giftCard.amount,
      message: giftCard.message,
      templatePath
    });

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
