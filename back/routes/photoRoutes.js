const express = require('express');
const router = express.Router();
const { getAllPhotos, getPhotosByCategory, createPhoto, deletePhoto } = require('../controllers/photoController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

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
 * /api/photos/category/{category}:
 *   get:
 *     summary: Récupérer les photos par catégorie
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [soins, epilation, maquillage, mains-pieds, evenement, carrousel-hero, carrousel-institut]
 *     responses:
 *       200:
 *         description: Liste des photos filtrées par catégorie
 */
router.get('/category/:category', getPhotosByCategory);

/**
 * @swagger
 * /api/photos:
 *   post:
 *     summary: Ajouter une photo avec upload de fichier (authentifié)
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image, category]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [soins, epilation, maquillage, mains-pieds, evenement, carrousel-hero, carrousel-institut]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Photo créée
 *       400:
 *         description: Aucun fichier reçu
 */
router.post('/', protect, upload.single('image'), createPhoto);

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
