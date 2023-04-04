const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

var app = express();
app.use(cookies());

var allowedOrigins = ["http://localhost:3000", "http://localhost:3006"];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const temp = function (origin, callback) {
  if (!origin) return callback(null, true);
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

// app.use(cors());
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

applicationRoutes = require("./controllers/Application.controller");
app.use("/application", applicationRoutes);

userRoutes = require("./controllers/User.controller");
app.use("/user", userRoutes);

interviewRoutes = require("./controllers/InterviewRequest.controller");
app.use("/interview", interviewRoutes);

courseRoutes = require("./controllers/Course.controller");
app.use("/course", courseRoutes);

// const auth = require("./routes/auth");
// app.use("/auth", auth);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const db = process.env.mongoURI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
  });
});
