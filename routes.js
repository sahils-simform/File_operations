const express = require("express");

const router = express.Router();
const multer = require("multer");
const {
  appendFile,
  streamToFile,
  uploadFile,
  readFile,
  writeFile,
} = require("./controllers/fileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// cb(null, file.fieldname + "-" + Date.now());
const upload = multer({ storage });

router.put("/append", appendFile);
router.get("/read/:filename", readFile);
router.post("/upload", upload.single("file"), uploadFile);
router.post("/write", writeFile);
router.post("/stream", streamToFile);

module.exports = router;
