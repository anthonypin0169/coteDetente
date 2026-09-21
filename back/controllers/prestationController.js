const Prestation = require('../models/prestation')
const path = require('path')
const fs = require('fs')

/* extraInfos arrive en JSON déjà parsé (body JSON classique) ou en chaîne
(formulaire multipart/form-data, ex: quand une vidéo est aussi envoyée) */
const parseExtraInfos = (extraInfos) => {
  if (typeof extraInfos !== 'string') return extraInfos
  return JSON.parse(extraInfos)
}

exports.getAllPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find()
    res.json(prestations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSearchablePrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find()
      .populate({
        path: 'group',
        populate: {
          path: 'sousType',
          populate: { path: 'type' }
        }
      })

    const searchable = prestations
      .filter((p) => p.group && p.group.sousType && p.group.sousType.type)
      .map((p) => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        duration: p.duration,
        route: p.group.sousType.route || p.group.sousType.type.route
      }))

    res.json(searchable)
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
    let videoUrl
    if (req.file) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`
      fs.writeFileSync(path.join('uploads', filename), req.file.buffer)
      videoUrl = `/uploads/${filename}`
    }
    const prestationData = { ...req.body, videoUrl }
    if (req.body.extraInfos !== undefined) {
      try {
        prestationData.extraInfos = parseExtraInfos(req.body.extraInfos)
      } catch {
        return res.status(400).json({ message: 'extraInfos doit être un JSON valide' })
      }
    }
    const prestation = await Prestation.create(prestationData)
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
    if (req.body.extraInfos !== undefined) {
      try {
        prestation.extraInfos = parseExtraInfos(req.body.extraInfos)
      } catch {
        return res.status(400).json({ message: 'extraInfos doit être un JSON valide' })
      }
    }

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
