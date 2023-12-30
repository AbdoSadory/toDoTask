import multer from 'multer'
import generateUniqueString from '../utils/generateUniqueString.js'
import allowedExtensions from '../utils/allowedExtensions.js'
import fs from 'fs'
import path from 'path'

export const uploadingFilesHandler = ({
  extensions = allowedExtensions.image,
  filePath = 'general',
}) => {
  const destinationPath = path.resolve(`src/uploads/${filePath}`)
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      req.filePath = filePath
      cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
      const uniquePrefix = generateUniqueString()
      cb(null, uniquePrefix + '-' + file.originalname)
    },
  })

  function fileFilter(req, file, cb) {
    if (extensions.includes(file.mimetype.split('/')[1])) {
      cb(null, true)
    } else {
      cb(new Error('Not Allowed File Type !'), false)
    }
  }

  const file = multer({ fileFilter, storage })

  return file
}

export default uploadingFilesHandler
