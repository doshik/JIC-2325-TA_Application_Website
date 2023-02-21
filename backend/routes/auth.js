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
  /*

    CAS LOGIC HERE

    */
  // also add function to turn casData into userData
  const studentData = {
    name: "Student Name",
    email: "studentName@gatech.edu",
    accountType: "student",
    gtID: "900000000",
    studentInfo: {
      year: "3",
      major: "CS",
      coursesTaken: ["CS 1331", "CS 1332", "CS 4641"],
      coursesTaking: ["CS 2340", "CS 2110", "CS 3510"],
      gpa: "3.5",
    },
  };

  const profData = {
    name: "Professor Name",
    email: "profName@gatech.edu",
    accountType: "professor",
    gtID: "900000001",
    professorInfo: {},
  };
  let userData;
  req.body.accountType ? (userData = profData) : (userData = studentData);

  // Find a user with a matching gtID
  User.findOne({ gtID: userData.gtID }, (error, user) => {
    if (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({ error: error._message });
    } else if (!user) {
      // If no user is found, create a new user
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: userData.name.toLowerCase(),
        email: userData.email.toLowerCase(),
        accountType: userData.accountType,
        gtID: userData.gtID,
        createdAt: Date(),
        professorInfo:
          userData.accountType == "professor"
            ? userData.professorInfo
            : undefined,
        studentInfo:
          userData.accountType == "student" ? userData.studentInfo : undefined,
        adminInfo:
          userData.accountType == "professor"
            ? userData.professorInfo
            : undefined,
      });
      // JWT SHOULD NOT BE VERY BIG, CURRENTLY HAS ALL USER INFO
      newUser.save((error, savedUser) => {
        if (error) {
          console.error("Error creating user:", error);
          return res.status(500).json({ error: error._message });
        } else {
          console.log("Created new user:", savedUser);
          const { accessToken } = generateToken(savedUser);
          return res.json({ token: "Bearer " + accessToken });
        }
      });
    } else {
      console.log("Found user:", user);
      const { accessToken } = generateToken(user);
      return res.json({ token: "Bearer " + accessToken });
    }
  });
});

module.exports = router;
