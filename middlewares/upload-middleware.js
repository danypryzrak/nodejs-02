const multer = require('multer')
const path = require('path')

const tempPath = path.join('/Users/sergey/Desktop/Projects/React/nodejs-02', 'temp')

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: multerStorage })

module.exports = {
    upload
}