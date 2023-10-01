const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = "./public/artikel/";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    var today = new Date();
    var timeStr = today.getTime().toString();
    cb(null, timeStr + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});
router.get("/", controller.get_all_article);
router.post("/", upload.single("thubnail"), controller.create_new_article);
module.exports = router;
