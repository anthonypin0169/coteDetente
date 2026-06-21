const multer = require('multer')
const path = require('path')

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|avif/
    const valid = allowed.test(path.extname(file.originalname).toLowerCase())
    valid ? cb(null, true) : cb(new Error('Format non supporté'))
  }
})

module.exports = upload
