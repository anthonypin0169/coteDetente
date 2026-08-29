const ContactPage = require('../models/contactPage')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getContactPage = async (req, res) => {
  try {
    const contactPage = await ContactPage.findOne()
    res.json(contactPage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateContactPage = async (req, res) => {
  try {
    const contactPage = await ContactPage.findOne()

    let photoUrl = contactPage?.photoUrl
    if (req.file) {
      if (photoUrl) {
        const oldPath = path.join('uploads', path.basename(photoUrl))
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      await sharp(req.file.buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(path.join('uploads', filename))
      photoUrl = `/uploads/${filename}`
    }

    const updated = await ContactPage.findOneAndUpdate({}, { photoUrl }, { new: true, upsert: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
