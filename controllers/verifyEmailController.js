const Trainer = require("../models/trainerModel.js");
const AppError = require("../utilities/appError.js");

//Verify user email with this.
exports.verifyEmail = async (req, res, next) => {
  const { uniqueString } = req.params;
  try{
    const trainer = await Trainer.findOne({ uniqueString :uniqueString })
    if(trainer) {
      trainer.isVerified = true;
      trainer.save();
      res.status(201).json({ message: "Email successfully verified"});
    }
    else {
      res.status(500).json({ message: "Invalid Link"});
    }
  } catch(err) {
    return next(new AppError(400, err.message));
  }
};
