const express = require('express')
const router = express.Router()
const { getAllHighlightCards, createHighlightCard, updateHighlightCard, deleteHighlightCard } = require('../controllers/highlightCardController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

/**
 * @swagger
 * /api/highlight-cards:
 *   get:
 *     summary: Récupérer les cartes de prestations mises en avant
 *     tags: [HighlightCards]
 *     responses:
 *       200:
 *         description: Liste des cartes
 */
router.get('/', getAllHighlightCards)

/**
 * @swagger
 * /api/highlight-cards:
 *   post:
 *     summary: Ajouter une carte mise en avant (authentifié)
 *     tags: [HighlightCards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [frontTitle]
 *             properties:
 *               frontTitle:
 *                 type: string
 *               frontText:
 *                 type: string
 *               backTitle:
 *                 type: string
 *               backText:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Carte créée
 */
router.post('/', protect, upload.single('photo'), createHighlightCard)

/**
 * @swagger
 * /api/highlight-cards/{id}:
 *   put:
 *     summary: Modifier une carte mise en avant (authentifié)
 *     tags: [HighlightCards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               frontTitle:
 *                 type: string
 *               frontText:
 *                 type: string
 *               backTitle:
 *                 type: string
 *               backText:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Carte mise à jour
 *       404:
 *         description: Carte introuvable
 */
router.put('/:id', protect, upload.single('photo'), updateHighlightCard)

/**
 * @swagger
 * /api/highlight-cards/{id}:
 *   delete:
 *     summary: Supprimer une carte mise en avant (authentifié)
 *     tags: [HighlightCards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carte supprimée
 *       404:
 *         description: Carte introuvable
 */
router.delete('/:id', protect, deleteHighlightCard)

module.exports = router
