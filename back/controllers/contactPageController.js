const ContactPage = require('../models/contactPage')
const { saveResponsiveImage, deleteResponsiveImage } = require('../utils/imagePipeline')

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
    let srcSet = contactPage?.srcSet
    if (req.file) {
      deleteResponsiveImage(photoUrl, srcSet)
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 1600 })
      photoUrl = image.url
      srcSet = image.srcSet
    }

    const photoAlt = req.body.photoAlt !== undefined ? req.body.photoAlt : contactPage?.photoAlt

    const updated = await ContactPage.findOneAndUpdate({}, { photoUrl, srcSet, photoAlt }, { new: true, upsert: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
