const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

var app = express();
app.use(cookies());

var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3006",
  "http://yourapp.com",
];
const temp = function (origin, callback) {
  if (!origin) return callback(null, true);
  console.log(origin);
  if (allowedOrigins.indexOf(origin) === -1) {
    var msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";
    return callback(new Error(msg), false);
  }
  return callback(null, true);
};

var options = {
  origin: temp,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));

// app.options("*", cors());

// Bodyparser middlewar
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "500mb" }));

const db = process.env.mongoURI;
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

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on ${port}!`));
