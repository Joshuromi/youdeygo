const multer = require('multer');
const path = require("path");

// Storage Engine
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
      callback( null,  file.fieldname + "-" + Date.now() + path.extname(file.originalname) );
    },
  });
  //INIT UPLOAD
  const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, callback) => {
      const fileTypes = /jpeg|jpg|png|gif/; // Allowed extension
      const extension = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      ); //get extension
      const mimeType = fileTypes.test(file.mimetype); //get mimetype
      // Check Extension and Mimetype
      if (extension && mimeType) {
        callback(null, true);
      } else {
        callback("Error: Image Only");
      }
    },
  }).single("image");

  module.exports = upload;

  