const Program = require("../models/programModel.js");
const AppError = require("../utilities/appError.js");
const _ = require("lodash");
var trainer = require("../models/trainerModel");

//Create a program
exports.createProgram = async (req, res, next) => {
  let coverPhoto;
  if (req.file == null) {
    coverPhoto = "./uploads/2021-07-blank-avatar.png";
  } else {
    coverPhoto = req.file.path;
  }
  try {
    const {
      title,
      price,
      description,
      duration,
      sessions,
      location,
    } = req.body;
    const trainerId = req.profile.id;
    const date = new Date(Date.now());
    const createdAt = new Date(Date.now());
    const updatedAt = new Date(Date.now());
    const program = await new Program({
      trainerId,
      title,
      price,
      description,
      date,
      coverPhoto,
      duration,
      sessions,
      location,
      createdAt,
      updatedAt,
    });
    const a = await program.save();
    await trainer.findByIdAndUpdate(
      trainerId,
      {
        $push:{
          "programs": program._id
        }
      }
    )
    res.status(201).json({ message: "success", program });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//View All Programs by the trainer
exports.viewAllPrograms = async (req, res, next) => {
  try {
    var program = await Program.find();
    res.status(200).json(program);
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//View a particular program by the trainer
exports.viewProgram = async (req, res, next) => {
  try {
    const id = req.params.id;
    const program = await Program.findById(id);
    res.status(200).json({ message: "success", program });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//Update the program
exports.updateProgram = async (req, res, next) => {
  try {
    const id = req.params.id;
    let program = await Program.findById(id);
    program = _.extend(program, req.body);
    program.updatedAt = new Date(Date.now());
    program.save((err) => {
      if (err) {
        return next(new AppError(500, err.message));
      }
      res.status(200).json({ message: "success", program });
    });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};

//Delete a Program
exports.deleteProgram = async (req, res, next) => {
  try {
    const id = req.params.id;
    const program = await Program.deleteOne({ _id: id });
    res.status(200).json({ message: "success", program });
  } catch (err) {
    return next(new AppError(400, err.message));
  }
};
