const GiftCard = require('../models/GiftCard');

exports.createGiftCard = async (req, res) => {
  try {
    const giftCard = await GiftCard.create(req.body);
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
