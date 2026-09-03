const express = require('express')
const router = express.Router()
const { getAllEvents, createEvent, updateEvent, deleteEvent, publishEventToInstagram } = require('../controllers/eventController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

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
 *               textColor:
 *                 type: string
 *                 enum: [white, black]
 *               textPositions:
 *                 type: string
 *                 description: JSON stringifié {title:{x,y}, dates:{x,y}, description:{x,y}}
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Évènement créé
 */
router.post('/', protect, upload.single('photo'), createEvent)

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
 *               textColor:
 *                 type: string
 *                 enum: [white, black]
 *               textPositions:
 *                 type: string
 *                 description: JSON stringifié {title:{x,y}, dates:{x,y}, description:{x,y}}
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Évènement mis à jour
 *       404:
 *         description: Évènement introuvable
 */
router.put('/:id', protect, upload.single('photo'), updateEvent)

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

/**
 * @swagger
 * /api/events/{id}/publish-instagram:
 *   post:
 *     summary: Publier la photo d'un évènement sur Instagram (authentifié)
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
 *         description: Publié sur Instagram
 *       400:
 *         description: Aucune photo pour cet évènement
 *       404:
 *         description: Évènement introuvable
 */
router.post('/:id/publish-instagram', protect, publishEventToInstagram)

module.exports = router
