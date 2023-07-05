const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Application = require("../models/Application.js");

const express = require("express");
const userRoutes = express.Router();
const mongoose = require("mongoose");
const { userAuth, generateToken } = require("../middleware/auth");
const formidable = require('formidable');
const fs = require('fs');
const s3 = require('../middleware/multer');

// @route POST api/user/signup
// @desc Signup a new user
// @access Public
userRoutes.route("/signup").post(function (req, res) {
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

// @route POST api/user/login
// @desc Login user and return JWT token
// @access Public
userRoutes.route("/login").post(async function (req, res) {
  /*
    CAS LOGIC HERE
    */
  // also add function to turn casData into userData
  const studentData = {
    name: "Student Name",
    email: "studentName@gatech.edu",
    accountType: "student",
    username: "studentName01",
    gtID: "900000000",
    studentInfo: {
      year: "3",
      major: "CS",
      coursesTaken: ["CS 1331", "CS 1332", "CS 4641"],
      coursesTaking: ["CS 2340", "CS 2110", "CS 3510"],
      gpa: "3.5",
    },
  };

  const professorData = {
    name: "Professor Name",
    email: "professorname@gatech.edu",
    username: "profName01",
    accountType: "professor",
    gtID: "900000001",
    professorInfo: {
      courses: ['CS 1331', 'CS 4641']
    },
  };


  req.body.role == 'student' ? userData = studentData : userData = professorData;

  
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
        username: userData.username,
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
          const token = generateToken(user);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 8640000,
          });
          res.status(200).json({ loggedIn: true, user: user, token: token});
        }
      });
    } else {
      console.log("Logging in user:", user);
      const token = generateToken(user);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 8640000,
      });
      res.status(200).json({ loggedIn: true, user: user, token: token});
    }
  });
});

// @route POST api/user/isLoggedIn
// @desc Check if user is logged in via JWT
// @access Public
userRoutes.route("/isLoggedIn").get(userAuth, (req, res) => {
  res.json({ loggedIn: true });
});

// @route POST api/user/logout
// @desc Logout user
// @access Public
userRoutes.route("/logout").get((req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ loggedIn: false });
});

// @route POST api/application/upload-file
// @desc Student uploads a profile picture
// @access Public
userRoutes
  .route("/upload-file")
  .post(userAuth, async function (req, res) {
    const form = new formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).send("Error parsing the request");

      try {
        const file = files.file;
        if (!file) return res.status(400).send("No file found");

        const fileData = fs.readFileSync(file.path);
        const fileKey = Date.now().toString() + "_" + file.name;
        const params = {
          Bucket: "user-data",
          Key: fileKey,
          Body: fileData,
          ContentType: file.type,
        };

        const data = await new Promise((resolve, reject) => {
          s3.upload(params, (err, data) => {
            if (err) reject(err);
            resolve(data);
          });
        });

        const newFileAttachment = new FileAttachment({
          file_url: data.Location,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          key: fileKey,
        });

        await newFileAttachment.save();

        // Find the user and update their profile picture key
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send("User not found");

        user.profile_picture_key = newFileAttachment._id; // set user profile_picture_key as the FileAttachment id

        await user.save();
        
        console.log("User profile picture updated", user);
        res.status(200).send({ user: user, fileAttachment: newFileAttachment });
      } catch (err) {
        console.log(err);
        res.status(400).send("Image upload failed");
      }
    });
  });

module.exports = userRoutes;
