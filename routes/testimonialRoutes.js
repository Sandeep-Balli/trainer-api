const express = require("express");
const router = express.Router();

// Authentication controllers
const {
  requireSignin,
  whoIsRequesting,
} = require("../controllers/authController");

// trainer controllers
const {
  createTestimonial,
  updateTestimonial,
  viewAllTestimonials,
  viewTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController");

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



//--------------------- All the common testimonial routes -----------------------//

router.post("/trainer/testimonial/create", upload.single("coverPhoto"),requireSignin, whoIsRequesting, createTestimonial);

router.patch("/trainer/testimonial/update/:id", requireSignin, whoIsRequesting, updateTestimonial);

router.get("/trainer/testimonial/viewAll", requireSignin, whoIsRequesting, viewAllTestimonials);

router.get("/trainer/testimonial/:id", requireSignin, whoIsRequesting, viewTestimonial);

router.delete("/trainer/testimonial/delete/:id", requireSignin, whoIsRequesting, deleteTestimonial);

module.exports = router;
