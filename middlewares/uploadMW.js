// uploadMiddleware.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    if (file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname);
    } else {
      cb(null, false);
    }
  },
});
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true)
//   } else {
//       //reject file
//       cb({message: 'Unsupported file format'}, false)
//   }
// }

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("Upload not supported file type...");
      // error.code = "UNSUPPORTED_FILE_TYPE";
      // error.message = "Upload not supported file type...";
      // error.name = "UNSUPPORTED_FILE_TYPE";
      cb(error, false);
    }
  },
});

module.exports = upload;
