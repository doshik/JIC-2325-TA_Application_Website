const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT;
const logger = require('./logger');

require("dotenv").config();
logger.info("Server is running on port " + PORT);
var app = express();
app.use(cookies());

var allowedOrigins = [
  "apply2ta.cc.gatech.edu",
  "http://127.0.0.1",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3006",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const temp = function (origin, callback) {
  if (!origin) return callback(null, true);
  if (allowedOrigins.indexOf(origin) === -1) {
    logger.info(`Origin: ${origin}`)
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
  exposedHeaders: ["Set-Cookie"],
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

applicationRoutes = require("./backend/controllers/Application.controller");
app.use("/application", applicationRoutes);

applicationTemplateRoutes = require("./backend/controllers/ApplicationTemplate.controller");
app.use("/application_templates", applicationTemplateRoutes);

userRoutes = require("./backend/controllers/User.controller");
app.use("/user", userRoutes);

interviewRoutes = require("./backend/controllers/InterviewRequest.controller");
app.use("/interview", interviewRoutes);

courseRoutes = require("./backend/controllers/Course.controller");
app.use("/course", courseRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});



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
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info("Server is running on port: " + PORT);
  });
});
