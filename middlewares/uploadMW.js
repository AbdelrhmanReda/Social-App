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
// const fileFilter = async (req, file, cb) => {
//   try {
//     const buffer = await file.buffer;
//     const fileTypeInfo = await fileType.fromBuffer(buffer);

//     // Define the allowed file types
//     const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

//     if (allowedTypes.includes(fileTypeInfo.mime)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type"));
//     }
//   } catch (error) {
//     cb(error);
//   }
// };

// Create the multer upload instance with the configured options
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

//   const isImage = file.mimetype.startsWith("image");
//   if (isImage) {
//     cb(null, true);
//   } else {
//     cb({ message: "Upload not supported file type..." }, false);
//   }
// },fileFilter: (req, file, cb) => {
//   const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Upload not supported file type..."), false);
//   }
// },
