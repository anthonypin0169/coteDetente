const sharp = require('sharp')
const path = require('path')
const { wrapGiftMessage } = require('../utils/giftCardLayout')

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

/* Positions et tailles en fraction de la largeur/hauteur de l'image : mêmes valeurs que la preview (giftCard.scss) */
const generateGiftCardImage = async (basePhotoPath, { amount, recipientName, message }) => {
  const baseImage = sharp(basePhotoPath)
  const { width, height } = await baseImage.metadata()

  const valueSize = Math.round(width * 0.034)
  const recipientSize = Math.round(width * 0.034)
  const messageSize = Math.round(width * 0.026)
  const messageLineHeight = messageSize * 1.3
  const font = 'font-family="Arial, Helvetica, DejaVu Sans, sans-serif"'

  // Message centré sur la moitié basse (75 % de la hauteur), découpé en lignes
  const lines = wrapGiftMessage(message)
  const firstLineY = height * 0.75 - ((lines.length - 1) * messageLineHeight) / 2
  const messageTspans = lines
    .map((line, i) => `<tspan x="50%" y="${firstLineY + i * messageLineHeight}">${escapeXml(line)}</tspan>`)
    .join('')

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="${width * 0.002}"/>
          <feOffset dy="${width * 0.001}" result="blur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.9"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <text x="${width * 0.03}" y="${height * 0.45}" dominant-baseline="middle" ${font} font-size="${valueSize}" fill="#000000">d'une valeur de : ${escapeXml(`${amount} €`)}</text>
      <text x="50%" y="${height * 0.57}" dominant-baseline="middle" text-anchor="middle" ${font} font-size="${recipientSize}" font-weight="bold" fill="#ffffff" filter="url(#shadow)">Pour ${escapeXml(recipientName)}</text>
      <text text-anchor="middle" dominant-baseline="middle" ${font} font-size="${messageSize}" fill="#ffffff" filter="url(#shadow)">${messageTspans}</text>
    </svg>
  `

  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-giftcard.jpg`
  const outputPath = path.join('uploads', filename)

  await baseImage
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toFile(outputPath)

  return outputPath
}

module.exports = { generateGiftCardImage }
