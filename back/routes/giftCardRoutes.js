const express = require('express');
const router = express.Router();
const { createGiftCard, getAllGiftCards } = require('../controllers/giftCardController');
const protect = require('../middleware/authMiddleware');

// Création manuelle réservée à l'admin : les clients passent par le paiement Stripe
router.post('/', protect, createGiftCard);
router.get('/', protect, getAllGiftCards);

module.exports = router;
