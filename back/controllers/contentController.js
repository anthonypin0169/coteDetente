const Content = require('../models/content')

exports.getContent = async (req, res) => {
  try {
    const content = await Content.findOne({ key: req.params.key })
    if (!content) return res.status(404).json({ message: 'Contenu introuvable' })
    res.json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      { ...req.body },
      { new: true, upsert: true }
    )
    res.json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
