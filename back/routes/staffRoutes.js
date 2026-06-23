const express = require('express')
const router = express.Router()
const { getAllStaff, createStaff, updateStaff, deleteStaff } = require('../controllers/staffController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Récupérer tous les membres du personnel
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Liste des membres
 */
router.get('/', getAllStaff)

/**
 * @swagger
 * /api/staff:
 *   post:
 *     summary: Ajouter un membre du personnel (authentifié)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               speciality:
 *                 type: string
 *               text:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Membre créé
 */
router.post('/', protect, upload.single('photo'), createStaff)

/**
 * @swagger
 * /api/staff/{id}:
 *   put:
 *     summary: Modifier un membre du personnel (authentifié)
 *     tags: [Staff]
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
 *               name:
 *                 type: string
 *               speciality:
 *                 type: string
 *               text:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Membre mis à jour
 *       404:
 *         description: Membre introuvable
 */
router.put('/:id', protect, upload.single('photo'), updateStaff)

/**
 * @swagger
 * /api/staff/{id}:
 *   delete:
 *     summary: Supprimer un membre du personnel (authentifié)
 *     tags: [Staff]
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
 *         description: Membre supprimé
 *       404:
 *         description: Membre introuvable
 */
router.delete('/:id', protect, deleteStaff)

module.exports = router
