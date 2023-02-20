const express = require("express");
const mongoose = require("mongoose");

// const User = require("./models/User");
// const Course = require("./models/Course");
// const Application = require("./models/Application");

const cors = require("cors");
require("dotenv").config();

const db = process.env.mongoURI;

var app = express();
app.use(cors());

app.options("*", cors());

// Bodyparser middlewar
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "500mb" }));

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

applicationRoutes = require("./controllers/Application.controller");
app.use("/application", applicationRoutes);

userRoutes = require("./controllers/User.controller");
app.use("/user", userRoutes);

// const auth = require("./routes/auth");
// app.use("/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}!`));
