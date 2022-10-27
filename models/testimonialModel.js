const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Testimonial Model -----------------------.

const testimonialSchema = new mongoose.Schema({
  trainerId: {
    type: ObjectId,
    ref: "Trainers",
  },
  comment:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profilePhoto: String,
});

module.exports = mongoose.model("Testimonials", testimonialSchema);
