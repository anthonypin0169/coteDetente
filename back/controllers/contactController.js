const { sendContactEmail } = require('../services/mailer')

exports.sendContactMessage = async (req, res) => {
  try {
    const { fullName, email, message } = req.body

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'Nom, email et message sont requis' })
    }

    await sendContactEmail({ fullName, email, message })
    res.json({ message: 'Message envoyé' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
