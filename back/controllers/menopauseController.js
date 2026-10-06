const { sendMenopauseEmail } = require('../services/mailer')

exports.sendMenopauseRequest = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Nom, email et téléphone sont requis' })
    }

    await sendMenopauseEmail({ fullName, email, phone, message })
    res.json({ message: 'Demande envoyée' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
