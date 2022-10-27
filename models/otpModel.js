const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//OTP model -----------------------.

const otpSchema = new mongoose.Schema({
  trainerId: {
    type: ObjectId,
    ref: "Trainers",
  },
  trainerEmail: String,
  otp: String,
  isValid: Boolean,
  isUsed: Boolean,
  expireIn: Number
}, {
  timestamps: true
});

//One time password-model
module.exports = mongoose.model("Opts", otpSchema);
