const express = require('express');
const router = express.Router();
const { getAllPhotos, createPhoto, deletePhoto } = require('../controllers/photoController');
const protect = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Récupérer toutes les photos
 *     tags: [Photos]
 *     responses:
 *       200:
 *         description: Liste des photos
 */
router.get('/', getAllPhotos);

/**
 * @swagger
 * /api/photos:
 *   post:
 *     summary: Ajouter une photo (authentifié)
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Photo créée
 */
router.post('/', protect, createPhoto);

/**
 * @swagger
 * /api/photos/{id}:
 *   delete:
 *     summary: Supprimer une photo (authentifié)
 *     tags: [Photos]
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
 *         description: Photo supprimée
 */
router.delete('/:id', protect, deletePhoto);

module.exports = router;
