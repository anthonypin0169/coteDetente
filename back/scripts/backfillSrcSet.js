require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const Staff = require('../models/staff')
const Photo = require('../models/photo')
const HighlightCard = require('../models/highlightCard')
const Type = require('../models/type')
const Group = require('../models/group')
const SousType = require('../models/sousType')
const Event = require('../models/event')
const GiftCardPage = require('../models/giftCardPage')
const ContactPage = require('../models/contactPage')

const WIDTH_STEPS = [400, 800, 1200, 1600]

/* Régénère un srcSet à partir d'un fichier avif déjà uploadé (garde ce fichier comme plus grande variante) */
async function buildSrcSetFromExistingFile(url) {
  const filepath = path.join('uploads', path.basename(url))
  if (!fs.existsSync(filepath)) return null

  const metadata = await sharp(filepath).metadata()
  const originalWidth = metadata.width
  if (!originalWidth) return null

  const widths = [...new Set(WIDTH_STEPS.filter(w => w < originalWidth))]
  if (widths.length === 0) return null

  const base = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const variants = [{ width: originalWidth, url }]

  for (const width of widths) {
    const filename = `${base}-${width}.avif`
    const info = await sharp(filepath)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 60 })
      .toFile(path.join('uploads', filename))
    variants.push({ width: info.width, url: `/uploads/${filename}` })
  }

  variants.sort((a, b) => a.width - b.width)
  return variants.map(v => `${v.url} ${v.width}w`).join(', ')
}

async function backfillModel(Model, urlField) {
  const docs = await Model.find({
    [urlField]: { $exists: true, $ne: null },
    $or: [{ srcSet: { $exists: false } }, { srcSet: null }]
  })
  console.log(`${Model.modelName} : ${docs.length} document(s) à traiter`)

  for (const doc of docs) {
    try {
      const srcSet = await buildSrcSetFromExistingFile(doc[urlField])
      if (srcSet) {
        doc.srcSet = srcSet
        await doc.save()
        console.log(`  OK ${doc._id}`)
      } else {
        console.log(`  ignoré ${doc._id} (image déjà assez petite)`)
      }
    } catch (error) {
      console.error(`  erreur sur ${doc._id} :`, error.message)
    }
  }
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connecté')

  await backfillModel(Staff, 'photoUrl')
  await backfillModel(Photo, 'url')
  await backfillModel(HighlightCard, 'photoUrl')
  await backfillModel(Type, 'photoUrl')
  await backfillModel(Group, 'photoUrl')
  await backfillModel(SousType, 'photoUrl')
  await backfillModel(Event, 'photoUrl')
  await backfillModel(GiftCardPage, 'photoUrl')
  await backfillModel(ContactPage, 'photoUrl')

  console.log('Terminé')
  await mongoose.disconnect()
}

run()
