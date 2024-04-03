const multer = require('multer');
const path = require("path");

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
})

module.exports = {
  imageUpload
}