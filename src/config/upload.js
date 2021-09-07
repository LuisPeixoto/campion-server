const multer = require('multer')
const path = require('path')

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

const storage = multer.diskStorage({
  destination: tmpFolder,
  filename: (request, file, callback) => {
    return callback(null, file.originalname)
  }
})

module.exports = storage
