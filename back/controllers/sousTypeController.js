const SousType = require('../models/sousType')
const Group = require('../models/group')
const Prestation = require('../models/prestation')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getAllSousTypes = async (req, res) => {
  try {
    const sousTypes = await SousType.find()
    res.json(sousTypes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSousTypesByType = async (req, res) => {
  try {
    const sousTypes = await SousType.find({ type: req.params.typeId })
    res.json(sousTypes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createSousType = async (req, res) => {
  try {
    const sousType = await SousType.create(req.body)
    res.status(201).json(sousType)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateSousType = async (req, res) => {
  try {
    const sousType = await SousType.findById(req.params.id)
    if (!sousType) return res.status(404).json({ message: 'Sous-type introuvable' })

    if (req.body.name !== undefined) sousType.name = req.body.name
    if (req.body.intro !== undefined) sousType.intro = req.body.intro
    if (req.body.pageTitle !== undefined) sousType.pageTitle = req.body.pageTitle
    if (req.body.route !== undefined) sousType.route = req.body.route
    if (req.body.type !== undefined) sousType.type = req.body.type

    const photoFile = req.files?.photo?.[0]
    if (photoFile) {
      if (sousType.photoUrl) {
        const oldPath = path.join('uploads', path.basename(sousType.photoUrl))
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      await sharp(photoFile.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(path.join('uploads', filename))
      sousType.photoUrl = `/uploads/${filename}`
    }

    const videoFile = req.files?.video?.[0]
    if (videoFile) {
      if (sousType.videoUrl) {
        const oldPath = path.join('uploads', path.basename(sousType.videoUrl))
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(videoFile.originalname)}`
      fs.writeFileSync(path.join('uploads', filename), videoFile.buffer)
      sousType.videoUrl = `/uploads/${filename}`
    }

    await sousType.save()
    res.json(sousType)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteSousType = async (req, res) => {
  try {
    const sousType = await SousType.findById(req.params.id)
    if (!sousType) return res.status(404).json({ message: 'Sous-type introuvable' })

    ;[sousType.photoUrl, sousType.videoUrl].forEach(url => {
      if (url) {
        const filepath = path.join('uploads', path.basename(url))
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
      }
    })

    const groups = await Group.find({ sousType: sousType._id })
    const groupIds = groups.map(group => group._id)
    await Prestation.deleteMany({ group: { $in: groupIds } })
    groups.forEach(group => {
      if (group.photoUrl) {
        const filepath = path.join('uploads', path.basename(group.photoUrl))
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
      }
    })
    await Group.deleteMany({ sousType: sousType._id })
    await sousType.deleteOne()
    res.json({ message: 'Sous-type supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
