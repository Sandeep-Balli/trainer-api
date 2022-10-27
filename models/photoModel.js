const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Photo model -----------------------.

const photoSchema = new mongoose.Schema({
  trainerId: {
    type: ObjectId,
    ref: "Trainers",
  },
  photoName: {
    type: String,
    required: true
  },
  photoPath: {
    type: String,
    required: true
  },
  photoType: {
    type: String,
    required: true
  },
  photoSize: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Photos", photoSchema);
