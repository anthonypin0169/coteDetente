const multer = require('multer')
const path = require('path')

// Accepte photos et vidéos sur tous les champs
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    return /mp4|webm|mov|jpeg|jpg|png|webp|avif/.test(ext) ? cb(null, true) : cb(new Error('Format non supporté'))
  }
})

module.exports = upload
