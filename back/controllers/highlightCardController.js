const HighlightCard = require('../models/highlightCard')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getAllHighlightCards = async (req, res) => {
  try {
    const cards = await HighlightCard.find()
    res.json(cards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createHighlightCard = async (req, res) => {
  try {
    let photoUrl = null
    if (req.file) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      photoUrl = `/uploads/${filename}`
    }
    const card = await HighlightCard.create({ ...req.body, photoUrl })
    res.status(201).json(card)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateHighlightCard = async (req, res) => {
  try {
    const card = await HighlightCard.findById(req.params.id)
    if (!card) return res.status(404).json({ message: 'Carte introuvable' })

    if (req.file) {
      if (card.photoUrl) {
        const oldFilename = path.basename(card.photoUrl)
        const oldPath = path.join('uploads', oldFilename)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      card.photoUrl = `/uploads/${filename}`
    }

    if (req.body.frontTitle !== undefined) card.frontTitle = req.body.frontTitle
    if (req.body.frontText !== undefined) card.frontText = req.body.frontText
    if (req.body.backTitle !== undefined) card.backTitle = req.body.backTitle
    if (req.body.backText !== undefined) card.backText = req.body.backText

    await card.save()
    res.json(card)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteHighlightCard = async (req, res) => {
  try {
    const card = await HighlightCard.findById(req.params.id)
    if (!card) return res.status(404).json({ message: 'Carte introuvable' })

    if (card.photoUrl) {
      const filename = path.basename(card.photoUrl)
      const filepath = path.join('uploads', filename)
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }

    await card.deleteOne()
    res.json({ message: 'Carte supprimée' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
