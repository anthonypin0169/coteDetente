const express = require('express')
const router = express.Router()
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController')
const protect = require('../middleware/authMiddleware')
const uploadMedia = require('../middleware/uploadSousTypeMedia')

const photoFields = uploadMedia.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'secondPhoto', maxCount: 1 },
  { name: 'thirdPhoto', maxCount: 1 }
])

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupérer tous les évènements, du plus récent au plus ancien
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Liste des évènements
 */
router.get('/', getAllEvents)

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Ajouter un évènement (authentifié)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               employeeName:
 *                 type: string
 *               description:
 *                 type: string
 *               recapDescription:
 *                 type: string
 *               isCurrent:
 *                 type: boolean
 *               photo:
 *                 type: string
 *                 format: binary
 *               secondPhoto:
 *                 type: string
 *                 format: binary
 *               thirdPhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Évènement créé
 */
router.post('/', protect, photoFields, createEvent)

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Modifier un évènement (authentifié)
 *     tags: [Events]
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
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               employeeName:
 *                 type: string
 *               description:
 *                 type: string
 *               recapDescription:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *               secondPhoto:
 *                 type: string
 *                 format: binary
 *               thirdPhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Évènement mis à jour
 *       404:
 *         description: Évènement introuvable
 */
router.put('/:id', protect, photoFields, updateEvent)

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Supprimer un évènement (authentifié)
 *     tags: [Events]
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
 *         description: Évènement supprimé
 *       404:
 *         description: Évènement introuvable
 */
router.delete('/:id', protect, deleteEvent)

module.exports = router
