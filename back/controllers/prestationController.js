const Prestation = require('../models/prestation')

exports.getAllPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find()
    res.json(prestations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPrestationsByGroup = async (req, res) => {
  try {
    const prestations = await Prestation.find({ group: req.params.groupId })
    res.json(prestations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createPrestation = async (req, res) => {
  try {
    const prestation = await Prestation.create(req.body)
    res.status(201).json(prestation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updatePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findById(req.params.id)
    if (!prestation) return res.status(404).json({ message: 'Prestation introuvable' })

    if (req.body.name !== undefined) prestation.name = req.body.name
    if (req.body.price !== undefined) prestation.price = req.body.price
    if (req.body.duration !== undefined) prestation.duration = req.body.duration
    if (req.body.group !== undefined) prestation.group = req.body.group

    await prestation.save()
    res.json(prestation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deletePrestation = async (req, res) => {
  try {
    const prestation = await Prestation.findById(req.params.id)
    if (!prestation) return res.status(404).json({ message: 'Prestation introuvable' })

    await prestation.deleteOne()
    res.json({ message: 'Prestation supprimée' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
