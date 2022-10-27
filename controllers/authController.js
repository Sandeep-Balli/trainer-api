const Trainer = require("../models/trainerModel.js");
const AppError = require("../utilities/appError.js");
const jwt = require("jsonwebtoken");

// use this middleware to protect routes

exports.requireSignin = async (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  // console.log(req.headers.authorization);
  const bearer = tokenWithBearer.split(" ");
  console.log(bearer);
  const token = bearer[1];
  console.log(token)
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
          return next(
            new AppError(500, "Unauthorized User!")
          );
      } else {
        req.token = token;
        next();
      }
    });
  } else {
      return next(new AppError(500, "You must login first"));
  }
};

// use this middleware to find the user, will almost use in every request - PUT THIS MIDDLEWARE IN CORRECT ORDER
exports.whoIsRequesting = async (req, res, next) => {
  try{
    const id = req.headers.id;
    const trainer = await Trainer.findById(id);
    if (trainer) {
      req.profile = trainer;
      next();
    } else {
      return next(
        new AppError(500, "Not authorized candidate")
      );
    }
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};