const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Application = require("../models/Application.js");
const ApplicationTemplate = require("../models/ApplicationTemplate.js");
const express = require("express");
const applicationRoutes = express.Router();
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/auth");

// @route POST api/application/save-submission
// @desc Student saves a TA application submission
// @access Public
applicationRoutes
  .route("/save-submission")
  .post(userAuth, async function (req, res) {
    try {
      console.log(req.body);
      const newSubmission = new Application({
        student: req.user.id,
        responses: req.body.responses,
      });

      const savedSubmission = await newSubmission.save();

      const submissions = await Application.find({
        student: req.user.id,
      });
      res.status(200).send({ submissions: submissions });
    } catch (err) {
      console.log(err);
      res.status(400).send("adding new application failed");
    }
  });

// @route GET api/application/get-submissions
// @desc Student gets all own TA application submissions
// @access Public
applicationRoutes
  .route("/get-submissions")
  .get(userAuth, async function (req, res) {
    try {
      const submissions = await Application.find({
        student: req.user.id,
      }).populate(["student", "professor", "course"]);

      res.status(200).send({ submissions: submissions });
    } catch (err) {
      res.status(400).send("getting applications failed");
    }
  });

// delete a submission
applicationRoutes
  .route("/delete-submission")
  .post(userAuth, async function (req, res) {
    try {
      const submission = await Application.findOneAndDelete({
        _id: req.body.id,
      });
      if (!submission) {
        res.status(400).send("Application not found");
        return;
      }

      const submissions = await Application.find({
        student: req.user.id,
      });
      res.status(200).send({ submissions: submissions });
    } catch (err) {
      res.status(400).send("deleting application template failed");
    }
  });

// update a submission
applicationRoutes
  .route("/update-submission")
  .post(userAuth, async function (req, res) {
    try {
      const submission = await Application.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { responses: req.body.responses } }
      );

      if (!submission) {
        res.status(400).send("Application not found");
        return;
      }

      const submissions = await Application.find({
        student: req.user.id,
      });
      res.status(200).send({ submissions: submissions });
    } catch (err) {
      res.status(400).send("updating application template failed");
    }
  });

module.exports = applicationRoutes;

// old endpoints

// app.post("/addNewApplication", (req, res) => {

//     const newApplication = new Application({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         professorId:  mongoose.Types.ObjectId(req.body.professorId),
//         default: false,
//         description: req.body.description,
//         assignedCourse: req.body.assignedCourse,
//         questions: req.body.questions,
//     });

//     newApplication
//     .save()
//     .then((newApplication) => {
//         console.log(newApplication);
//         res.json(newApplication.name + " has been created by " + newApplication.professorId + "! \n The application ID is " + newApplication._id);
//     })
//     .catch((err) => console.log(err));

//   });

//   app.post("/assignApplicationToCourse", (req, res) => {
//     console.log(req.body.courseId)
//     Course
//     .findById
//     (mongoose.Types.ObjectId(req.body.courseId))
//     .then((course) => {
//         console.log(course)
//         course.application = mongoose.Types.ObjectId(req.body.applicationId);
//         course
//         .save()
//         .then((course) => {
//             console.log(course);
//             res.json("Application " + course.application + " has been assigned to course " + course.name + "!");
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
//   });

//   app.post("/editApplication", (req, res) => {
//     Application
//     .findById
//     (req.body.applicationId)
//     .then((application) => {
//         application.name = req.body.name;
//         application.description = req.body.description;
//         application.questions = req.body.questions;
//         application
//         .save()
//         .then((application) => {
//             console.log(application);
//             res.json("Application " + application.name + " has been updated!");
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
//   });
