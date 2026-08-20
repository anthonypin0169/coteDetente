const multer = require('multer')
const path = require('path')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (file.fieldname === 'video') {
      return /mp4|webm|mov/.test(ext) ? cb(null, true) : cb(new Error('Format vidéo non supporté'))
    }
    return /jpeg|jpg|png|webp|avif/.test(ext) ? cb(null, true) : cb(new Error('Format image non supporté'))
  }
})

module.exports = upload
