const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");

//multer middleware

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", API.fetchAllMovies);
router.get("/:id", API.fetchMovieById);
router.post("/", upload, API.createMovie);
router.patch("/:id", upload, API.updateMovie);
router.delete("/:id", API.deleteMovie);

module.exports = router;
