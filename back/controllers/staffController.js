const Staff = require('../models/staff')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find()
    res.json(staff)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createStaff = async (req, res) => {
  try {
    let photoUrl = null
    if (req.file) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      photoUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`
    }
    const member = await Staff.create({ ...req.body, photoUrl })
    res.status(201).json(member)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateStaff = async (req, res) => {
  try {
    const member = await Staff.findById(req.params.id)
    if (!member) return res.status(404).json({ message: 'Membre introuvable' })

    if (req.file) {
      if (member.photoUrl) {
        const oldFilename = path.basename(member.photoUrl)
        const oldPath = path.join('uploads', oldFilename)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      const outputPath = path.join('uploads', filename)
      await sharp(req.file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath)
      member.photoUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`
    }

    if (req.body.name !== undefined) member.name = req.body.name
    if (req.body.speciality !== undefined) member.speciality = req.body.speciality
    if (req.body.text !== undefined) member.text = req.body.text

    await member.save()
    res.json(member)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteStaff = async (req, res) => {
  try {
    const member = await Staff.findById(req.params.id)
    if (!member) return res.status(404).json({ message: 'Membre introuvable' })

    if (member.photoUrl) {
      const filename = path.basename(member.photoUrl)
      const filepath = path.join('uploads', filename)
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }

    await member.deleteOne()
    res.json({ message: 'Membre supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
