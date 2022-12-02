const express = require('express');
require("dotenv").config();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Application = require('./models/Application');
var app = express();
const db = process.env.mongoURI;
var bodyParser = require('body-parser')
// Bodyparser middleware
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
// 



app.listen(3000, () => console.log('TA Application Server is listening on port 3000.'));


  
