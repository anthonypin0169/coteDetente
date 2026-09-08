const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/stripeController');

/**
 * @swagger
 * /api/stripe/create-checkout-session:
 *   post:
 *     summary: Créer une session de paiement Stripe pour une carte cadeau
 *     tags: [Stripe]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [senderName, senderEmail, recipientName, amount]
 *             properties:
 *               senderName:
 *                 type: string
 *               senderEmail:
 *                 type: string
 *               recipientName:
 *                 type: string
 *               message:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: URL de la page de paiement Stripe
 */
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
