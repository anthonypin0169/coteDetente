const express = require('express')
const router = express.Router()
const { getContactPage, updateContactPage } = require('../controllers/contactPageController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

/**
 * @swagger
 * /api/contact-page:
 *   get:
 *     summary: Récupérer l'image de fond de la page contact
 *     tags: [ContactPage]
 *     responses:
 *       200:
 *         description: Donnée de la page contact
 */
router.get('/', getContactPage)

/**
 * @swagger
 * /api/contact-page:
 *   put:
 *     summary: Modifier l'image de fond de la page contact (authentifié)
 *     tags: [ContactPage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Page contact mise à jour
 */
router.put('/', protect, upload.single('photo'), updateContactPage)

module.exports = router
