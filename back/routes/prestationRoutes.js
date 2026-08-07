const express = require('express')
const router = express.Router()
const { getAllPrestations, getPrestationsByGroup, createPrestation, updatePrestation, deletePrestation } = require('../controllers/prestationController')
const protect = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/prestations:
 *   get:
 *     summary: Récupérer toutes les prestations
 *     tags: [Prestations]
 *     responses:
 *       200:
 *         description: Liste des prestations
 */
router.get('/', getAllPrestations)

/**
 * @swagger
 * /api/prestations/group/{groupId}:
 *   get:
 *     summary: Récupérer les prestations d'un groupe donné
 *     tags: [Prestations]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des prestations du groupe
 */
router.get('/group/:groupId', getPrestationsByGroup)

/**
 * @swagger
 * /api/prestations:
 *   post:
 *     summary: Ajouter une prestation (authentifié)
 *     tags: [Prestations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, group]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               duration:
 *                 type: string
 *               group:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prestation créée
 */
router.post('/', protect, createPrestation)

/**
 * @swagger
 * /api/prestations/{id}:
 *   put:
 *     summary: Modifier une prestation (authentifié)
 *     tags: [Prestations]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               duration:
 *                 type: string
 *               group:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prestation mise à jour
 *       404:
 *         description: Prestation introuvable
 */
router.put('/:id', protect, updatePrestation)

/**
 * @swagger
 * /api/prestations/{id}:
 *   delete:
 *     summary: Supprimer une prestation (authentifié)
 *     tags: [Prestations]
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
 *         description: Prestation supprimée
 *       404:
 *         description: Prestation introuvable
 */
router.delete('/:id', protect, deletePrestation)

module.exports = router
