const express = require("express");
const router = express.Router();

// Authentication controllers
const {
  requireSignin,
  whoIsRequesting,
} = require("../controllers/authController");

// trainer controllers
const {
  signup,
  login,
  updateProfile,
  viewAllTrainers,
  viewTrainer,
} = require("../controllers/trainerController");

// Verify Email
const { verifyEmail } = require("../controllers/verifyEmailController");

// Change Password
const {
  forgetPassword,
  resetPassword,
} = require("../controllers/resetPasswordController");

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

//--------------------- All the common trainer routes -----------------------//

router.post("/trainer/signup", upload.single("profileImage"), signup);

router.get("/verify/:uniqueString", verifyEmail);

router.post("/trainer/forgetPassword", forgetPassword);

router.post("/trainer/reset-password", resetPassword);

router.post("/trainer/login", login);

router.get("/trainer/viewAll", viewAllTrainers);

router.get("/trainer/:id", viewTrainer);

router.patch("/trainer/profile", requireSignin, whoIsRequesting, updateProfile);

module.exports = router;
