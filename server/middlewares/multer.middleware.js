const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Fn to create a storage engine with dynamic folders
const getStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '..', 'uploads', folder)
      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true })
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
  })
}

// Upload a single file middleware
const singleUpload = (folder, fileName) => {
  return multer({
    storage: getStorage(folder),
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb)
      // Pass the folder name to the controller
      req.folderName = folder
    }
  }).single(fileName)
}

// Upload a multiple files middleware
const multipleUpload = (folder, fileName) => {
  return multer({
    storage: getStorage(folder),
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb)
      // Pass the folder name to the controller
      req.folderName = folder
    },
  }).array(fileName, 20)
}

// Check file type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Please, Upload Images Only!');
  }

}

module.exports = { singleUpload, multipleUpload }