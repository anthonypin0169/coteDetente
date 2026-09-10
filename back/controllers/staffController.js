const Staff = require('../models/staff')
const { saveResponsiveImage, deleteResponsiveImage } = require('../utils/imagePipeline')

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
    let srcSet = null
    if (req.file) {
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 800 })
      photoUrl = image.url
      srcSet = image.srcSet
    }
    const member = await Staff.create({ ...req.body, photoUrl, srcSet })
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
      deleteResponsiveImage(member.photoUrl, member.srcSet)
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 800 })
      member.photoUrl = image.url
      member.srcSet = image.srcSet
    }

    if (req.body.name !== undefined) member.name = req.body.name
    if (req.body.speciality !== undefined) member.speciality = req.body.speciality
    if (req.body.text !== undefined) member.text = req.body.text
    if (req.body.photoAlt !== undefined) member.photoAlt = req.body.photoAlt

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

    deleteResponsiveImage(member.photoUrl, member.srcSet)

    await member.deleteOne()
    res.json({ message: 'Membre supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
