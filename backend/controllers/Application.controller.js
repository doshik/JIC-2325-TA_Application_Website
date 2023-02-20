const User = require("../models/User.js");
const Application = require("../models/Application.js");
const express = require("express");
const applicationRoutes = express.Router();
const mongoose = require("mongoose");

// Save a student's new application
applicationRoutes.route("/student/submit").post(function (req, res) {
  //   let application = new Application(req.body);
  const newApplication = new Application({
    student: mongoose.Types.ObjectId(req.body.student),
    professor: mongoose.Types.ObjectId(req.body.professorId),
    course: mongoose.Types.ObjectId(req.body.courseId),
    data: req.body.data,
  });

  newApplication
    .save()
    .then(() => {
      res.status(200).json({ submissionStatus: "SUCCESS" });
    })
    .catch((err) => {
      res.status(400).send("adding new application failed");
    });
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
