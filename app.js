const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
//cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());

//------------------------------------ import routes here---------------------//
const programRoutes = require("./routes/programRoutes.js");
const testimonialRoutes = require("./routes/testimonialRoutes.js");
const trainerRoutes = require("./routes/trainerRoutes.js");

const offerRoutes = require("./routes/offerRoutes.js");
// const fileUploaderRoutes = require("./routes/fileUploaderRoutes.js");
//-----------------------------------

// Database connection
require("./db/connection");

//GET at home route---> will move this to seperate route folder later
app.get("/", (req, res) => {
  res.json({ message: "Welcome to trainer API" });
});

//-------------------Trainer routes ---------------//
app.use(programRoutes);

app.use(testimonialRoutes);

app.use(trainerRoutes);

app.use(offerRoutes);

// app.use(fileUploaderRoutes);

// 404 api
app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
});

// server port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
