const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcrypt");

//Trainer Model ----------------NEED VALIDATION HERE.

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"]
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  programs: [{
    type: ObjectId,
    ref: "Programs"
  }],
  testimonials: [{
    type: ObjectId,
    ref: "Testimonials"
  }],
  profileImage: String,
  coverPhoto: String,
  about: String,
  tags: String,
  facebook: String,
  instagram: String,
  twitter: String,
  isVerified: Boolean,
  uniqueString: String,
  registrationDate: String,
  phone: Number,
  city: String,
  country: String,
  
});

//Static login method

trainerSchema.statics.login = async function (email, password) {
  const trainer = await this.findOne({email : email});
  if(trainer){
    const auth = await bcrypt.compare(password, trainer.password);
    if(auth){
        return trainer;
    }
    throw Error("Email and password dosenot match");
  }
  throw Error("Invalid user credentials. If you are a new user, please register yourself so that you can login");
};

// trainerSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model("Trainers", trainerSchema);
