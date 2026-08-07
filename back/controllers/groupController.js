const Group = require('../models/group')
const Prestation = require('../models/prestation')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find()
    res.json(groups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getGroupsBySousType = async (req, res) => {
  try {
    const groups = await Group.find({ sousType: req.params.sousTypeId })
    res.json(groups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createGroup = async (req, res) => {
  try {
    let photoUrl = null
    if (req.file) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      photoUrl = `/uploads/${filename}`
    }
    const group = await Group.create({ ...req.body, photoUrl })
    res.status(201).json(group)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
    if (!group) return res.status(404).json({ message: 'Groupe introuvable' })

    if (req.file) {
      if (group.photoUrl) {
        const oldFilename = path.basename(group.photoUrl)
        const oldPath = path.join('uploads', oldFilename)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      group.photoUrl = `/uploads/${filename}`
    }

    if (req.body.name !== undefined) group.name = req.body.name
    if (req.body.description !== undefined) group.description = req.body.description
    if (req.body.sousType !== undefined) group.sousType = req.body.sousType

    await group.save()
    res.json(group)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
    if (!group) return res.status(404).json({ message: 'Groupe introuvable' })

    if (group.photoUrl) {
      const filename = path.basename(group.photoUrl)
      const filepath = path.join('uploads', filename)
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }

    await Prestation.deleteMany({ group: group._id })
    await group.deleteOne()
    res.json({ message: 'Groupe supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
