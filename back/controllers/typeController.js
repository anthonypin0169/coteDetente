const Type = require('../models/type')
const SousType = require('../models/sousType')
const Prestation = require('../models/prestation')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.find()
    res.json(types)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createType = async (req, res) => {
  try {
    let photoUrl = null
    if (req.file) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      photoUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`
    }
    const type = await Type.create({ ...req.body, photoUrl })
    res.status(201).json(type)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id)
    if (!type) return res.status(404).json({ message: 'Type introuvable' })

    if (req.file) {
      if (type.photoUrl) {
        const oldFilename = path.basename(type.photoUrl)
        const oldPath = path.join('uploads', oldFilename)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      type.photoUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`
    }

    if (req.body.name !== undefined) type.name = req.body.name

    await type.save()
    res.json(type)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id)
    if (!type) return res.status(404).json({ message: 'Type introuvable' })

    if (type.photoUrl) {
      const filename = path.basename(type.photoUrl)
      const filepath = path.join('uploads', filename)
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }

    const sousTypes = await SousType.find({ type: type._id })
    const sousTypeIds = sousTypes.map(sousType => sousType._id)
    await Prestation.deleteMany({ sousType: { $in: sousTypeIds } })
    await SousType.deleteMany({ type: type._id })

    await type.deleteOne()
    res.json({ message: 'Type supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
