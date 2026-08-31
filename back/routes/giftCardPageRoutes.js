const express = require('express')
const router = express.Router()
const { getGiftCardPage, updateGiftCardPage } = require('../controllers/giftCardPageController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

/**
 * @swagger
 * /api/gift-card-page:
 *   get:
 *     summary: Récupérer le contenu de la page carte cadeau
 *     tags: [GiftCardPage]
 *     responses:
 *       200:
 *         description: Contenu de la page carte cadeau
 */
router.get('/', getGiftCardPage)

/**
 * @swagger
 * /api/gift-card-page:
 *   put:
 *     summary: Modifier le contenu de la page carte cadeau (authentifié)
 *     tags: [GiftCardPage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortText:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Page carte cadeau mise à jour
 */
router.put('/', protect, upload.single('photo'), updateGiftCardPage)

module.exports = router
