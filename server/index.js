const path = require("path");
const express = require("express");
const multer = require("multer");
const findRemoveSync = require('find-remove');
const cors = require("cors");
const compression = require('compression');
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 5000;

// compress responses
app.use(compression());
app.use(helmet());
app.use(cors());

/**
 * Define path and naming for multer package to save images
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image/");
  },
  filename: function (req, file, cb) {
    cb(null, "image" + Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 2097152 } });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

/**
 * Remove images older than 12 hours, every 6 hours
 */
setInterval(findRemoveSync.bind(this,path.join(__dirname, "public/image"), {prefix:'image-', limit: 3, age: {seconds: 43200}}), 21600000);

const fs = require("fs");
let imageCount = fs.readdirSync(path.join(__dirname, "public/image")).length;
app.get("/", () =>{
  res.sendFile("./build/index.html");
});

/**
 * Delete old images
 */
function deleteOldFiles() {
  let removedCount = 0;
  if (imageCount > 100) {
    removedCount = (findRemoveSync(path.join(__dirname, "public/image"), {prefix:'image', age: {seconds: 10}, limit: imageCount-1})).length;
  } else if (imageCount > 20) {
    removedCount = (findRemoveSync(path.join(__dirname, "public/image"), {prefix:'image', age: {seconds: 50}, limit: imageCount-8}));
  } else {
    removedCount = (findRemoveSync(path.join(__dirname, "public/image"), {prefix:'image', age: {seconds: 3600}, limit: 3}));
  }

  imageCount -= removedCount;
}

deleteOldFiles();

/**
 * Upload received image
 */
app.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  imageCount++;
  deleteOldFiles();
  // Send image url
  res.send(req.protocol + "://" + req.get("host") + "/image/" + req.file.filename);
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
