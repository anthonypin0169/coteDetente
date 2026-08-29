const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

const sendContactEmail = async ({ fullName, email, message }) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Configuration email manquante (GMAIL_USER / GMAIL_APP_PASSWORD)')
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `Nouvelle demande de contact - ${fullName}`,
    text: `Nom : ${fullName}\nEmail : ${email}\n\nMessage :\n${message}`
  })
}

module.exports = { sendContactEmail }
