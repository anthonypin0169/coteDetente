const HighlightCard = require('../models/highlightCard')
const { saveResponsiveImage, deleteResponsiveImage } = require('../utils/imagePipeline')

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
    let srcSet = null
    if (req.file) {
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 800 })
      photoUrl = image.url
      srcSet = image.srcSet
    }
    const card = await HighlightCard.create({ ...req.body, photoUrl, srcSet })
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
      deleteResponsiveImage(card.photoUrl, card.srcSet)
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 800 })
      card.photoUrl = image.url
      card.srcSet = image.srcSet
    }

    if (req.body.frontTitle !== undefined) card.frontTitle = req.body.frontTitle
    if (req.body.frontText !== undefined) card.frontText = req.body.frontText
    if (req.body.backTitle !== undefined) card.backTitle = req.body.backTitle
    if (req.body.backText !== undefined) card.backText = req.body.backText
    if (req.body.redirectTo !== undefined) card.redirectTo = req.body.redirectTo
    if (req.body.photoAlt !== undefined) card.photoAlt = req.body.photoAlt

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

    deleteResponsiveImage(card.photoUrl, card.srcSet)

    await card.deleteOne()
    res.json({ message: 'Carte supprimée' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
