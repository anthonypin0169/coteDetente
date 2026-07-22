const express = require('express')
const router = express.Router()
const { getAllTypes, createType, updateType, deleteType } = require('../controllers/typeController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Récupérer tous les types de prestations
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: Liste des types
 */
router.get('/', getAllTypes)

/**
 * @swagger
 * /api/types:
 *   post:
 *     summary: Ajouter un type de prestations (authentifié)
 *     tags: [Types]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, route]
 *             properties:
 *               name:
 *                 type: string
 *               route:
 *                 type: string
 *                 enum: [/soins, /maquillage, /epilation, /mains-et-pieds]
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Type créé
 */
router.post('/', protect, upload.single('photo'), createType)

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     summary: Modifier un type de prestations (authentifié)
 *     tags: [Types]
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
 *               route:
 *                 type: string
 *                 enum: [/soins, /maquillage, /epilation, /mains-et-pieds]
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Type mis à jour
 *       404:
 *         description: Type introuvable
 */
router.put('/:id', protect, upload.single('photo'), updateType)

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     summary: Supprimer un type de prestations, ses sous-types et leurs prestations (authentifié)
 *     tags: [Types]
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
 *         description: Type supprimé
 *       404:
 *         description: Type introuvable
 */
router.delete('/:id', protect, deleteType)

module.exports = router
