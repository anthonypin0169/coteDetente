const express = require('express');
const router = express.Router();
const { createGiftCard, getAllGiftCards } = require('../controllers/giftCardController');
const protect = require('../middleware/authMiddleware');

router.post('/', createGiftCard);
router.get('/', protect, getAllGiftCards);

module.exports = router;
