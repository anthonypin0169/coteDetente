const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.orange.fr',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendContactEmail = async ({ fullName, email, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Configuration email manquante (EMAIL_USER / EMAIL_PASSWORD)')
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `Nouvelle demande de contact - ${fullName}`,
    text: `Nom : ${fullName}\nEmail : ${email}\n\nMessage :\n${message}`
  })
}

const sendGiftCardEmails = async ({ senderName, senderEmail, senderPhone, recipientName, amount, message, templatePath }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Configuration email manquante (EMAIL_USER / EMAIL_PASSWORD)')
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: senderEmail,
    subject: `Nouvelle commande de carte cadeau - ${senderName}`,
    text: `Acheteur : ${senderName}\nEmail : ${senderEmail}\nTéléphone : ${senderPhone || '-'}\nDestinataire : ${recipientName}\nMontant : ${amount} €\nMessage : ${message || '-'}`
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: senderEmail,
    subject: 'Votre carte cadeau Côté Détente',
    text: `Bonjour ${senderName},\n\nMerci pour votre commande de carte cadeau d'une valeur de ${amount} € à destination de ${recipientName}.\nVous trouverez ci-joint le modèle à imprimer.\n\nÀ bientôt,\nL'équipe Côté Détente`,
    attachments: templatePath ? [{ path: templatePath }] : []
  })
}

module.exports = { sendContactEmail, sendGiftCardEmails }
