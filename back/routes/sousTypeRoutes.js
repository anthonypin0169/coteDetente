const express = require('express')
const router = express.Router()
const { getAllSousTypes, getSousTypesByType, createSousType, updateSousType, deleteSousType } = require('../controllers/sousTypeController')
const protect = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/sous-types:
 *   get:
 *     summary: Récupérer tous les sous-types
 *     tags: [SousTypes]
 *     responses:
 *       200:
 *         description: Liste des sous-types
 */
router.get('/', getAllSousTypes)

/**
 * @swagger
 * /api/sous-types/type/{typeId}:
 *   get:
 *     summary: Récupérer les sous-types d'un type donné
 *     tags: [SousTypes]
 *     parameters:
 *       - in: path
 *         name: typeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des sous-types du type
 */
router.get('/type/:typeId', getSousTypesByType)

/**
 * @swagger
 * /api/sous-types:
 *   post:
 *     summary: Ajouter un sous-type (authentifié)
 *     tags: [SousTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *               intro:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sous-type créé
 */
router.post('/', protect, createSousType)

/**
 * @swagger
 * /api/sous-types/{id}:
 *   put:
 *     summary: Modifier un sous-type (authentifié)
 *     tags: [SousTypes]
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
 *               intro:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sous-type mis à jour
 *       404:
 *         description: Sous-type introuvable
 */
router.put('/:id', protect, updateSousType)

/**
 * @swagger
 * /api/sous-types/{id}:
 *   delete:
 *     summary: Supprimer un sous-type et ses prestations (authentifié)
 *     tags: [SousTypes]
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
 *         description: Sous-type supprimé
 *       404:
 *         description: Sous-type introuvable
 */
router.delete('/:id', protect, deleteSousType)

module.exports = router
