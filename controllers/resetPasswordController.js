const Trainer = require("../models/trainerModel.js");
const Otp = require("../models/otpModel.js");
const bcrypt = require("bcrypt");
const AppError = require("../utilities/appError.js");
const { sendOtp } = require("../utilities/verificationMail");

// Forget Password controller
exports.forgetPassword = async (req, res, next) => {
  try{
    const trainer = await Trainer.findOne({email: req.body.email})
    if(trainer){
      if(trainer.isVerified == true){
        let otpCode = Math.floor((Math.random() * 10000) + 1);
        let otp = new Otp({
          trainerId: trainer._id,
          trainerEmail: trainer.email,
          otp: otpCode,
          expireIn: new Date().getTime() + (300 * 1000),
          isValid: true,
          isUsed: false
        });
        await otp.save();
        sendOtp(req.body.email, otpCode);
        res.status(201).json({ message: "OTP is sent to the email", otp});
      }
      else {
        res.status(501).json({ message: "Email not Verified"});
      }
    }
    else{
      res.status(500).json({ message: "Invalid email"});
    }
  } catch (err){
    next(new AppError(400, err.message));
  }
};

//Verify OTP controller
exports.resetPassword = async (req, res, next) => {
  try{
    const trainerOtp = await Otp.findOne({otp: req.body.otpCode });
    const trainer = await Trainer.findOne({email: trainerOtp.trainerEmail});
    const newPassword = req.body.password;
    if(trainer){
      let currentTime = new Date().getTime();
      let timeDiff = trainerOtp.expireIn - currentTime;
      if (timeDiff < 0 || trainerOtp.isUsed == true) {
        trainerOtp.isValid = false;
        res.status(500).json({ message: "OTP is Expired"});
      }
      else {
        trainerOtp.isValid = false;
        trainerOtp.isUsed = true;
        const salt = await bcrypt.genSalt();
        trainer.password = await bcrypt.hash(newPassword, salt);
        await trainer.save();
        await trainerOtp.save();
        res.status(200).json({ message: "Password changed successfully"});
      }
    }
    else{
      res.status(500).json({ message: "Incorrect OTP"});
    }
  } catch (err){
    next(new AppError(400, err.message));
  }
};