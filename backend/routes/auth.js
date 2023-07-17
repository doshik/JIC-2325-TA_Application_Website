const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
import { generateToken } from "../middleware/auth";
module.exports = router;

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  console.log("Login Trigger")
  let username = req.body.username;
  let password = req.body.password;

  // Find a user with a matching username
  User.findOne({ username: username }, (error, user) => {
    if (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({ error: error._message });
    } else if (!user) {
      // If no user is found, return an error
      return res.status(404).json({ error: "User not found" });
    } else if (user.userInfo.password !== password) {
      // If password does not match, return an error
      return res.status(400).json({ error: "Password is incorrect" });
    } else {
      // If username is found and password matches, return the user
      console.log("User logged in:", user);
      const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        gtID: user.gtID,
        accountType: user.accountType,
        userInfo: user.userInfo,
        profile_picture_key: user.profile_picture_key,
      };
      jwt.sign(
        payload,
        'YOUR_SECRET',
        { expiresIn: 3600 }, // 1 hour in seconds
        (err, token) => {
          if(err){
            console.error("Error generating token:", err);
            return res.status(500).json({ error: err._message });
          }
          return res.json({ success: true, token: 'Bearer ' + token });
        }
      );
    }
  });
});


module.exports = router;
