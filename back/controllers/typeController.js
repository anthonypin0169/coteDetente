const Type = require('../models/type')
const SousType = require('../models/sousType')
const Group = require('../models/group')
const Prestation = require('../models/prestation')
const { saveResponsiveImage, deleteResponsiveImage } = require('../utils/imagePipeline')

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
    let srcSet = null
    if (req.file) {
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 1200 })
      photoUrl = image.url
      srcSet = image.srcSet
    }
    const type = await Type.create({ ...req.body, photoUrl, srcSet })
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
      deleteResponsiveImage(type.photoUrl, type.srcSet)
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 1200 })
      type.photoUrl = image.url
      type.srcSet = image.srcSet
    }

    if (req.body.name !== undefined) type.name = req.body.name
    if (req.body.route !== undefined) type.route = req.body.route
    if (req.body.photoAlt !== undefined) type.photoAlt = req.body.photoAlt

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

    deleteResponsiveImage(type.photoUrl, type.srcSet)

    const sousTypes = await SousType.find({ type: type._id })
    const sousTypeIds = sousTypes.map(sousType => sousType._id)

    const groups = await Group.find({ sousType: { $in: sousTypeIds } })
    const groupIds = groups.map(group => group._id)
    groups.forEach(group => {
      deleteResponsiveImage(group.photoUrl, group.srcSet)
    })

    await Prestation.deleteMany({ group: { $in: groupIds } })
    await Group.deleteMany({ sousType: { $in: sousTypeIds } })
    await SousType.deleteMany({ type: type._id })

    await type.deleteOne()
    res.json({ message: 'Type supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
