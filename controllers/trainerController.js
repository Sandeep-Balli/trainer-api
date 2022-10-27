const Trainer = require("../models/trainerModel.js");
const AppError = require("../utilities/appError.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/createToken");
const { confirmEmail, randString } = require("../utilities/verificationMail");
const _ = require("lodash");

// signup controller with jwt and sending verification mail.
exports.signup = async (req, res, next) => {
  // var profileImage;
  let { name, email, password } = req.body;
  if (req.file == null) {
    profileImage = "./uploads/2021-07-blank-avatar.png";
  } else {
    profileImage = req.file.path;
  }
  const uniqueString = randString();
  const isVerified = false;
  try {
    const oldTrainer = await Trainer.findOne({ email: email });
    if (oldTrainer) {
      res.status(500).json({ message: "Email already registered" });
    } else {
      const registrationDate = new Date(Date.now());
      const trainer = await new Trainer({
        name,
        email,
        password,
        uniqueString,
        isVerified,
        registrationDate,
        profileImage,
      });
      const salt = await bcrypt.genSalt();
      trainer.password = await bcrypt.hash(trainer.password, salt);
      const token = createToken(trainer._id);
      await trainer.save();
      res.cookie("dairingjwt", token, { httpOnly: true });
      confirmEmail(email, uniqueString);
      res
        .status(201)
        .json({
          message:
            "Please check your email inbox for an email from Dairing and verify your email id",
          token,
          trainer,
        });
      console.log(uniqueString);
    }
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

// login controller with jwt
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const trainer = await Trainer.login(email, password);
    const token = createToken(trainer._id);
    res.cookie("dairingjwt", token, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 1000),
    }); // add options if needed
    res.status(200).json({ message: "success", token, trainer });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//View all trainers
exports.viewAllTrainers = async (req, res, next) => {
  try {
    const trainer = await Trainer.find();
    res.status(200).json(trainer);
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//View trainer profile
exports.viewTrainer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trainer = await Trainer.findById(id);
    res.status(200).json({ message: "success", trainer });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//Update trainer profile
exports.updateProfile = async (req, res, next) => {
  try {
    let trainer = req.profile;
    trainer = _.extend(trainer, req.body);
    const token = createToken(trainer._id);
    trainer.save((err) => {
      if (err) {
        return next(new AppError(500, err.message));
      }
      res.cookie("dairingjwt", token, {
        sameSite: "strict",
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 1000),
      }); // add options if needed
      res.status(200).json({ message: "success", token, trainer });
    });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};
