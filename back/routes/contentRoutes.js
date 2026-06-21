const express = require('express')
const router = express.Router()
const { getContent, updateContent } = require('../controllers/contentController')
const protect = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/content/{key}:
 *   get:
 *     summary: Récupérer un bloc de contenu par clé
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du contenu (ex. "company-profile")
 *     responses:
 *       200:
 *         description: Contenu trouvé
 *       404:
 *         description: Contenu introuvable
 */
router.get('/:key', getContent)

/**
 * @swagger
 * /api/content/{key}:
 *   put:
 *     summary: Créer ou mettre à jour un bloc de contenu (authentifié)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               paragraphs:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Contenu mis à jour
 */
router.put('/:key', protect, updateContent)

module.exports = router
