const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  destination: (req, file, cb) => {
    cb(null, "./public/assets");
  },
});

module.exports.upload = multer({ storage });
