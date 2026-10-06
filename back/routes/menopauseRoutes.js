const express = require('express')
const router = express.Router()
const { sendMenopauseRequest } = require('../controllers/menopauseController')

/**
 * @swagger
 * /api/menopause:
 *   post:
 *     summary: Envoyer une demande de rendez-vous ménopause
 *     tags: [Ménopause]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, phone]
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Demande envoyée
 *       400:
 *         description: Champs manquants
 */
router.post('/', sendMenopauseRequest)

module.exports = router
