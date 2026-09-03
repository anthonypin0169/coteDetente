const sharp = require('sharp')
const path = require('path')

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

const generateGiftCardImage = async (basePhotoPath, { amount, recipientName }) => {
  const baseImage = sharp(basePhotoPath)
  const { width, height } = await baseImage.metadata()

  const safeRecipientName = escapeXml(recipientName)
  const safeAmount = escapeXml(`${amount} €`)

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="72%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(height * 0.08)}" font-weight="bold" fill="#ffffff" stroke="#000000" stroke-width="1">${safeAmount}</text>
      <text x="50%" y="84%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(height * 0.05)}" fill="#ffffff" stroke="#000000" stroke-width="0.5">Pour ${safeRecipientName}</text>
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
