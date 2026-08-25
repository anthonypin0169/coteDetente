const Prestation = require('../models/prestation')
const path = require('path')
const fs = require('fs')

exports.getAllPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find()
    res.json(prestations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPrestationsByGroup = async (req, res) => {
  try {
    const prestations = await Prestation.find({ group: req.params.groupId })
    res.json(prestations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createPrestation = async (req, res) => {
  try {
    const prestation = await Prestation.create(req.body)
    res.status(201).json(prestation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updatePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findById(req.params.id)
    if (!prestation) return res.status(404).json({ message: 'Prestation introuvable' })

    if (req.body.name !== undefined) prestation.name = req.body.name
    if (req.body.price !== undefined) prestation.price = req.body.price
    if (req.body.duration !== undefined) prestation.duration = req.body.duration
    if (req.body.group !== undefined) prestation.group = req.body.group
    if (req.body.description !== undefined) prestation.description = req.body.description

    if (req.file) {
      if (prestation.videoUrl) {
        const oldPath = path.join('uploads', path.basename(prestation.videoUrl))
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`
      fs.writeFileSync(path.join('uploads', filename), req.file.buffer)
      prestation.videoUrl = `/uploads/${filename}`
    }

    await prestation.save()
    res.json(prestation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deletePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findById(req.params.id)
    if (!prestation) return res.status(404).json({ message: 'Prestation introuvable' })

    if (prestation.videoUrl) {
      const filepath = path.join('uploads', path.basename(prestation.videoUrl))
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }

    await prestation.deleteOne()
    res.json({ message: 'Prestation supprimée' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
