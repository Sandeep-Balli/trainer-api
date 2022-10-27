const Testimonial = require("../models/testimonialModel.js");
const AppError = require("../utilities/appError.js");
const _ = require("lodash");
var trainer = require("../models/trainerModel");

//Craete Testimonial
exports.createTestimonial = async (req, res, next) => {
  try{
    // var profilePhoto;
  if (req.file == null) {
    profileImage = "./uploads/2021-07-blank-avatar.png";
  } else {
    profileImage = req.file.path;
  }
    const { name, comment, profilePhoto } = req.body;
    const trainerId = req.profile._id;
    const testimonial = await new Testimonial({ trainerId, name, comment, profilePhoto});
    await testimonial.save();
    await trainer.findByIdAndUpdate(
      trainerId,
      {
        $push:{
          "programs": testimonial._id
        }
      }
    )
    res.status(201).json({ message: "success", testimonial });
  } catch (err){
    return next(new AppError(400, err.message));
  }
};

//View all testimonial for a trainer
exports.viewAllTestimonials = async (req, res, next) => {
    try{
      const testimonial = await Testimonial.find();
      res.status(200).json({ message: "success", testimonial });
    } catch(err){
      return next(new AppError(400, err.message));
    }
  };

  //View a particular testimonial
  exports.viewTestimonial = async (req, res, next) => {
    try{
      const id = req.params.id;
      const testimonial = await Testimonial.findById(id);
      res.status(200).json({ message: "success", testimonial });
    } catch(err){
      return next(new AppError(400, err.message));
    }
  };
  
  //Update a testimonial
  exports.updateTestimonial = async (req, res, next) => {
    try{
      const id = req.params.id;
      let testimonial = await Testimonial.findById(id);
      testimonial = _.extend(testimonial, req.body);
      testimonial.save((err) => {
        if (err) {
          return next(new AppError(500, err.message));
        }
        res.status(200).json({ message: "success", testimonial });
      });
    } catch (err){
      return next(new AppError(400, err.message));
    }
  };

  //Delete a testimonial
  exports.deleteTestimonial = async (req, res, next) => {
    try{
        const id = req.params.id;
        const testimonial = await Testimonial.deleteOne({ _id: id });
        res.status(200).json({ message: "success", testimonial });
      } catch(err){
        return next(new AppError(400, err.message));
      }
  };