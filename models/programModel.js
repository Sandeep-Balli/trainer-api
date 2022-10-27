const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Program Model -----------------------.

const programSchema = new mongoose.Schema({
  trainerId: {
    type: ObjectId,
    ref: "Trainers",
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  coverPhoto: String,
  duration: String,
  location: String,
  sessions: Number,
  createdAt: String,
  updatedAt: String,
});

module.exports = mongoose.model("Programs", programSchema);
