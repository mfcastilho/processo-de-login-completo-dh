const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
  destination:(req, file, callback)=>{
    callback(null, "src/public/images");
  },
  filename:(req, file, callback)=>{
    callback(null, `${Date.now()}_img_${file.originalname}`);
  }
});

const uploadFile = multer({ storage:storage });

module.exports = uploadFile;