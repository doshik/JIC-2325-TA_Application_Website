const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Application = require("../models/Application.js");

const express = require("express");
const userRoutes = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    user.toObject(),
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return { accessToken };
};

// @route POST api/user/login
// @desc Login user and return JWT token
// @access Public
userRoutes.route("/login").post(function (req, res) {
  /*

    CAS LOGIC HERE

    */
  // also add function to turn casData into userData
  const userData = {
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

// @route POST api/user/newAccount
// @desc Login user and return JWT token
// @access Public
userRoutes.route("/newAccount").post(function (req, res) {
  User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user account with that email already exists." });
    } else {
      const newAccount = new User({
        _id: new mongoose.Types.ObjectId(),
        accountType: req.body.accountType,
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        createdAt: Date(),
        professorInfo: req.body.professorInfo,
        studentInfo: null,
        adminInfo: null,
      });

      const course1 = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: "CS 4641",
        professorInfo: newAccount._id,
        application: null,
      });

      const course2 = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: "CS 7641",
        professorInfo: newAccount._id,
        application: null,
      });

      const defaultApp = new Application({
        _id: new mongoose.Types.ObjectId(),
        name: "Default Application",
        professorId: newAccount._id,
        default: true,
        description: "This is the default application",
        assignedCourse: course1._id,
        questions: [
          {
            written: false,
            questionPrompt: "What is your GPA?",
            options: [
              {
                optionText: "< 3.0",
              },
              {
                optionText: "3.0 - 3.5",
              },
              {
                optionText: "> 3.5",
              },
            ],
            response: "",
          },
          {
            written: true,
            questionPrompt: "Why do you want to join this course?",
            options: [],
            response: "",
          },
        ],
      });

      defaultApp.save().catch((err) => console.log(err));
      course1.application = defaultApp._id;
      course1.save().catch((err) => console.log(err));

      defaultApp.save().catch((err) => console.log(err));
      course2.application = defaultApp._id;
      course2.save().catch((err) => console.log(err));

      newAccount.professorInfo.courses = {
        CS4641: course1._id,
        CS7641: course2._id,
      };
      newAccount
        .save()
        .then((newAccount) => {
          console.log(newAccount);
          res.json(
            "Account for " +
              newAccount.name +
              " has been created! Their ID is " +
              newAccount._id +
              " \n Their courses are: " +
              newAccount.professorInfo.courses["CS4641"] +
              " and " +
              newAccount.professorInfo.courses["CS7641"]
          );
        })
        .catch((err) => console.log(err));
    }
  });
});

module.exports = userRoutes;
