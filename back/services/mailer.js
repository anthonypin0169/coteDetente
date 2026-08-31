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

const sendGiftCardEmails = async ({ senderName, senderEmail, recipientName, amount, message, templatePath }) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Configuration email manquante (GMAIL_USER / GMAIL_APP_PASSWORD)')
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: senderEmail,
    subject: `Nouvelle commande de carte cadeau - ${senderName}`,
    text: `Acheteur : ${senderName} (${senderEmail})\nDestinataire : ${recipientName}\nMontant : ${amount} €\nMessage : ${message || '-'}`
  })

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: senderEmail,
    subject: 'Votre carte cadeau Côté Détente',
    text: `Bonjour ${senderName},\n\nMerci pour votre commande de carte cadeau d'une valeur de ${amount} € à destination de ${recipientName}.\nVous trouverez ci-joint le modèle à imprimer.\n\nÀ bientôt,\nL'équipe Côté Détente`,
    attachments: templatePath ? [{ path: templatePath }] : []
  })
}

module.exports = { sendContactEmail, sendGiftCardEmails }
