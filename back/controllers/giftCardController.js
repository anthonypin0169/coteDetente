const GiftCard = require('../models/giftCard');
const GiftCardPage = require('../models/giftCardPage');
const path = require('path');
const fs = require('fs');
const { sendGiftCardEmails } = require('../services/mailer');
const { generateGiftCardImage } = require('../services/giftCardImage');

exports.createGiftCard = async (req, res) => {
  let generatedImagePath = null;

  try {
    const giftCard = await GiftCard.create(req.body);

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
      recipientName: giftCard.recipientName,
      amount: giftCard.amount,
      message: giftCard.message,
      templatePath
    });

    res.status(201).json(giftCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (generatedImagePath && fs.existsSync(generatedImagePath)) fs.unlinkSync(generatedImagePath);
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
