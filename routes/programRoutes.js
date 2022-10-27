const express = require("express");
const router = express.Router();

// Authentication controllers
const {
  requireSignin,
  whoIsRequesting,
} = require("../controllers/authController");

// trainer controllers
const {
  createProgram,
  updateProgram,
  viewAllPrograms,
  viewProgram,
  deleteProgram,
} = require("../controllers/programController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const upload = multer({dest: 'uploads/'});
const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//--------------------- All the common program routes -----------------------//

router.post(
  "/trainer/program/create",
  upload.single("coverPhoto"),
  requireSignin,
  whoIsRequesting,
  createProgram
);
// router.post("/trainer/program/create",upload.single("coverPhoto"),whoIsRequesting, createProgram);

router.patch(
  "/trainer/program/update/:id",
  requireSignin,
  whoIsRequesting,
  updateProgram
);

router.get("/trainer/program/viewAll", viewAllPrograms);

router.get("/trainer/program/:id", requireSignin, whoIsRequesting, viewProgram);

router.delete(
  "/trainer/program/delete/:id",
  requireSignin,
  whoIsRequesting,
  deleteProgram
);

module.exports = router;
