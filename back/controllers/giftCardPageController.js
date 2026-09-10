const GiftCardPage = require('../models/giftCardPage')
const { saveResponsiveImage, deleteResponsiveImage } = require('../utils/imagePipeline')

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
    let srcSet = giftCardPage?.srcSet
    if (req.file) {
      deleteResponsiveImage(photoUrl, srcSet)
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 1200 })
      photoUrl = image.url
      srcSet = image.srcSet
    }

    const updated = await GiftCardPage.findOneAndUpdate(
      {},
      { ...req.body, photoUrl, srcSet },
      { new: true, upsert: true }
    )
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
