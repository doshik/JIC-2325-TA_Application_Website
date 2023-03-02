const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const db = process.env.mongoURI;
const auth = require('./routes/auth');


var app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);  
  }
}

app.use(cors());
app.options("*", cors());

// Bodyparser middleware
var bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
      limit: "500mb",
      extended: false,
    })
  );
  app.use(bodyParser.json({ limit: "500mb" }));
// 

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("Server is running on port: " + PORT);
  })
});