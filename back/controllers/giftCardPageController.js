const GiftCardPage = require('../models/giftCardPage')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.getGiftCardPage = async (req, res) => {
  try {
    const giftCardPage = await GiftCardPage.findOne()
    res.json(giftCardPage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateGiftCardPage = async (req, res) => {
  try {
    const giftCardPage = await GiftCardPage.findOne()

    let photoUrl = giftCardPage?.photoUrl
    if (req.file) {
      if (photoUrl) {
        const oldPath = path.join('uploads', path.basename(photoUrl))
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(path.join('uploads', filename))
      photoUrl = `/uploads/${filename}`
    }

    const updated = await GiftCardPage.findOneAndUpdate(
      {},
      { ...req.body, photoUrl },
      { new: true, upsert: true }
    )
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
