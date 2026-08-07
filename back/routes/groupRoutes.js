const express = require('express')
const router = express.Router()
const { getAllGroups, getGroupsBySousType, createGroup, updateGroup, deleteGroup } = require('../controllers/groupController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Récupérer tous les groupes
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Liste des groupes
 */
router.get('/', getAllGroups)

/**
 * @swagger
 * /api/groups/sous-type/{sousTypeId}:
 *   get:
 *     summary: Récupérer les groupes d'un sous-type donné
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: sousTypeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des groupes du sous-type
 */
router.get('/sous-type/:sousTypeId', getGroupsBySousType)

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Ajouter un groupe (authentifié)
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, sousType]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               sousType:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Groupe créé
 */
router.post('/', protect, upload.single('photo'), createGroup)

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Modifier un groupe (authentifié)
 *     tags: [Groups]
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
 *               description:
 *                 type: string
 *               sousType:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Groupe mis à jour
 *       404:
 *         description: Groupe introuvable
 */
router.put('/:id', protect, upload.single('photo'), updateGroup)

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Supprimer un groupe et ses prestations (authentifié)
 *     tags: [Groups]
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
 *         description: Groupe supprimé
 *       404:
 *         description: Groupe introuvable
 */
router.delete('/:id', protect, deleteGroup)

module.exports = router
