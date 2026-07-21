const Prestation = require('../models/prestation')

exports.getAllPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find()
    res.json(prestations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPrestationsBySousType = async (req, res) => {
  try {
    const prestations = await Prestation.find({ sousType: req.params.sousTypeId })
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
    if (req.body.text !== undefined) prestation.text = req.body.text
    if (req.body.sousType !== undefined) prestation.sousType = req.body.sousType

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
