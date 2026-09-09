const GiftCard = require('../models/giftCard');
const GiftCardPage = require('../models/giftCardPage');
const path = require('path');
const fs = require('fs');
const { sendGiftCardEmails } = require('../services/mailer');
const { generateGiftCardImage } = require('../services/giftCardImage');

exports.finalizePaidGiftCard = async (data) => {
  let generatedImagePath = null;

  try {
    const giftCard = await GiftCard.create({ ...data, isPaid: true });

    const giftCardPage = await GiftCardPage.findOne();
    let templatePath = giftCardPage?.photoUrl
      ? path.join('uploads', path.basename(giftCardPage.photoUrl))
      : null;

    if (templatePath) {
      generatedImagePath = await generateGiftCardImage(templatePath, {
        amount: giftCard.amount,
        recipientName: giftCard.recipientName
      });
      templatePath = generatedImagePath;
    }

    await sendGiftCardEmails({
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
