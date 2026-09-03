const Event = require('../models/event')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const { publishPhotoToInstagram } = require('../services/instagram')

const savePhoto = async (file) => {
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
  await sharp(file.buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .avif({ quality: 60 })
    .toFile(path.join('uploads', filename))
  return `/uploads/${filename}`
}

const deletePhoto = (url) => {
  if (!url) return
  const filepath = path.join('uploads', path.basename(url))
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
}

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createEvent = async (req, res) => {
  try {
    const photoUrl = req.file ? await savePhoto(req.file) : undefined
    const isCurrent = req.body.isCurrent === 'true'

    if (isCurrent) {
      await Event.updateMany({ isCurrent: true }, { isCurrent: false })
    }

    const eventData = { ...req.body, isCurrent, photoUrl }
    if (req.body.textPositions !== undefined) {
      try {
        eventData.textPositions = JSON.parse(req.body.textPositions)
      } catch {
        return res.status(400).json({ message: 'textPositions doit être un JSON valide' })
      }
    }

    const event = await Event.create(eventData)
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'Évènement introuvable' })

    if (req.file) {
      deletePhoto(event.photoUrl)
      event.photoUrl = await savePhoto(req.file)
    }

    if (req.body.title !== undefined) event.title = req.body.title
    if (req.body.startDate !== undefined) event.startDate = req.body.startDate
    if (req.body.endDate !== undefined) event.endDate = req.body.endDate
    if (req.body.employeeName !== undefined) event.employeeName = req.body.employeeName
    if (req.body.description !== undefined) event.description = req.body.description
    if (req.body.recapDescription !== undefined) event.recapDescription = req.body.recapDescription
    if (req.body.textColor !== undefined) event.textColor = req.body.textColor
    if (req.body.textPositions !== undefined) {
      try {
        event.textPositions = JSON.parse(req.body.textPositions)
      } catch {
        return res.status(400).json({ message: 'textPositions doit être un JSON valide' })
      }
    }

    await event.save()
    res.json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'Évènement introuvable' })

    deletePhoto(event.photoUrl)

    await event.deleteOne()

    let promotedEvent = null
    if (event.isCurrent) {
      const nextEvent = await Event.findOne().sort({ createdAt: -1 })
      if (nextEvent) {
        nextEvent.isCurrent = true
        await nextEvent.save()
        promotedEvent = nextEvent
      }
    }

    res.json({ message: 'Évènement supprimé', promotedEvent })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.publishEventToInstagram = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'Évènement introuvable' })
    if (!event.photoUrl) return res.status(400).json({ message: 'Cet évènement n\'a pas de photo à publier' })

    const avifPath = path.join('uploads', path.basename(event.photoUrl))
    const jpegFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`
    const jpegPath = path.join('uploads', jpegFilename)
    await sharp(avifPath).jpeg({ quality: 85 }).toFile(jpegPath)

    const imageUrl = `${process.env.PUBLIC_SITE_URL}/uploads/${jpegFilename}`
    const caption = [event.title, event.description].filter(Boolean).join('\n\n')

    const instagramResult = await publishPhotoToInstagram(imageUrl, caption)

    if (fs.existsSync(jpegPath)) fs.unlinkSync(jpegPath)

    res.json({ message: 'Publié sur Instagram', instagram: instagramResult })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
