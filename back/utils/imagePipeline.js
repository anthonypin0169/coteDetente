const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const WIDTH_STEPS = [400, 800, 1200, 1600]

/*
  Génère plusieurs tailles d'une même image (avif) et renvoie :
  - url : la variante la plus grande (compat avec le code existant qui n'utilise qu'une seule URL)
  - srcSet : la chaîne prête pour l'attribut srcSet React, ex "url1 400w, url2 800w"
*/
async function saveResponsiveImage(buffer, { maxWidth = 1200, quality = 60 } = {}) {
  const metadata = await sharp(buffer).metadata()
  const originalWidth = metadata.width || maxWidth
  const cap = Math.min(maxWidth, originalWidth)

  const widths = [...new Set([...WIDTH_STEPS.filter(w => w < cap), cap])].sort((a, b) => a - b)

  const base = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const variants = []

  for (const width of widths) {
    const filename = `${base}-${width}.avif`
    const info = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality })
      .toFile(path.join('uploads', filename))
    variants.push({ width: info.width, url: `/uploads/${filename}` })
  }

  const url = variants[variants.length - 1].url
  const srcSet = variants.map(v => `${v.url} ${v.width}w`).join(', ')
  return { url, srcSet }
}

/* Supprime tous les fichiers référencés par une url + son srcSet */
function deleteResponsiveImage(url, srcSet) {
  const urls = new Set()
  if (url) urls.add(url)
  if (srcSet) {
    srcSet.split(',').forEach(part => {
      const fileUrl = part.trim().split(' ')[0]
      if (fileUrl) urls.add(fileUrl)
    })
  }
  urls.forEach(fileUrl => {
    const filepath = path.join('uploads', path.basename(fileUrl))
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
  })
}

module.exports = { saveResponsiveImage, deleteResponsiveImage }
