const nodemailer = require('nodemailer')

/* Serveur d'envoi réglable par le .env. Sans SMTP_*, on garde Orange (configuration locale).
   En production (OVH bloque les ports 465/587), on passe par Brevo sur le port 2525 :
   SMTP_HOST=smtp-relay.brevo.com, SMTP_PORT=2525, SMTP_SECURE=false */
const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER
const smtpPassword = process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD
// Adresse affichée comme expéditeur (doit être validée chez Brevo en production)
const mailFrom = process.env.MAIL_FROM || process.env.EMAIL_USER

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.orange.fr',
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || 'true') === 'true',
  auth: {
    user: smtpUser,
    pass: smtpPassword
  },
  // Échoue vite avec une erreur claire si le serveur mail ne répond pas
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 30000
})

const checkMailConfig = () => {
  if (!smtpUser || !smtpPassword || !mailFrom) {
    throw new Error('Configuration email manquante (SMTP_USER / SMTP_PASSWORD / MAIL_FROM ou EMAIL_USER / EMAIL_PASSWORD)')
  }
}

const sendContactEmail = async ({ fullName, email, message }) => {
  checkMailConfig()

  await transporter.sendMail({
    from: mailFrom,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `Nouvelle demande de contact - ${fullName}`,
    text: `Nom : ${fullName}\nEmail : ${email}\n\nMessage :\n${message}`
  })
}

const sendMenopauseEmail = async ({ fullName, email, phone, message }) => {
  checkMailConfig()

  await transporter.sendMail({
    from: mailFrom,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `Demande de RDV ménopause - ${fullName}`,
    text: `Nom : ${fullName}
Email : ${email}
Téléphone : ${phone}

Message :
${message || '-'}`
  })
}

const sendGiftCardEmails = async ({ senderName, senderEmail, senderPhone, recipientName, amount, message, templatePath }) => {
  checkMailConfig()

  await transporter.sendMail({
    from: mailFrom,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: senderEmail,
    subject: `Nouvelle commande de carte cadeau - ${senderName}`,
    text: `Acheteur : ${senderName}\nEmail : ${senderEmail}\nTéléphone : ${senderPhone || '-'}\nDestinataire : ${recipientName}\nMontant : ${amount} €\nMessage : ${message || '-'}`
  })

  await transporter.sendMail({
    from: mailFrom,
    to: senderEmail,
    subject: 'Votre carte cadeau Côté Détente',
    text: `Bonjour ${senderName},\n\nMerci pour votre commande de carte cadeau d'une valeur de ${amount} € à destination de ${recipientName}.\nVous trouverez ci-joint le modèle à imprimer.\n\nÀ bientôt,\nL'équipe Côté Détente`,
    attachments: templatePath ? [{ path: templatePath }] : []
  })
}

module.exports = { sendContactEmail, sendMenopauseEmail, sendGiftCardEmails }
