const express = require('express')
const router = express.Router()
const { sendContactMessage } = require('../controllers/contactController')

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Envoyer un message via le formulaire de contact
 *     tags: [Contact]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, message]
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message envoyé
 *       400:
 *         description: Champs manquants
 */
router.post('/', sendContactMessage)

module.exports = router
