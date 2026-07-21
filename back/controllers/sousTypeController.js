const SousType = require('../models/sousType')
const Prestation = require('../models/prestation')

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
    if (req.body.type !== undefined) sousType.type = req.body.type

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

    await Prestation.deleteMany({ sousType: sousType._id })
    await sousType.deleteOne()
    res.json({ message: 'Sous-type supprimé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
