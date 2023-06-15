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
        const newSubmission = new Application({
          student: req.user.id,
          professor: req.body.course.professor,
          course: req.body.course,
          applicationTemplate: req.body.course.applicationTemplate,
          responses: req.body.responses,
          submitted: req.body.submitted,
          status: req.body.submitted ? "Submitted" : "",
        });

        const savedSubmission = await newSubmission.save();

        const submissions = await Application.find({
          student: req.user.id,
        }).populate(["student", "professor", "course", "applicationTemplate"]);
        res.status(200).send({ submissions: submissions });
      } catch (err) {
        console.log(err);
        res.status(400).send("adding new application failed");
      }
    });

// @route GET api/application/student/get-submissions
// @desc Student gets all own TA application submissions
// @access Public
applicationRoutes
    .route("/student/get-submissions")
    .get(userAuth, async function (req, res) {
      try {
        const submissions = await Application.find({
          student: req.user.id,
        }).populate(["student", "professor", "course", "applicationTemplate"]);

        res.status(200).send({ submissions: submissions });
      } catch (err) {
        res.status(400).send("getting applications failed");
      }
    });

// @route GET api/application/prof/get-submissions
// @desc Prof gets all TA application submissions for a course
// @access Public
applicationRoutes
.route("/prof/get-submissions")
.get(userAuth, async function (req, res) {
  try {
    let userQuery = {};
    if (req.query.gpa) userQuery['userInfo.gpa'] = req.query.gpa;
    if (req.query.major) userQuery['userInfo.major'] = req.query.major;
    if (req.query.coursesTaken) userQuery['userInfo.coursesTaken'] = { $in: req.query.coursesTaken.split(",") };
    if (req.query.coursesTaking) userQuery['userInfo.coursesTaking'] = { $in: req.query.coursesTaking.split(",") };
    if (req.query.year) userQuery['userInfo.year'] = req.query.year;

    const users = await User.find(userQuery);
    const userIds = users.map(user => user._id);

    let appQuery = {
      professor: req.user.id,
      course: req.query.course,
      submitted: true,
      student: { $in: userIds },
    };

    let applications = await Application.find(appQuery)
        .populate(["student", "professor", "course", "applicationTemplate"]);

    if (applications.length === 0) {
      return res.status(404).send("No applications found with the provided filters.");
    }

    if (req.query.sortBy && req.query.order) {
      applications.sort((a, b) => {
        let fieldA = a.student.userInfo[req.query.sortBy];
        let fieldB = b.student.userInfo[req.query.sortBy];

        if (req.query.order === "desc") {
          return ("" + fieldB).localeCompare(fieldA);
        } else {
          return ("" + fieldA).localeCompare(fieldB);
        }
      });
    }

    const pageSize = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const paginatedApplications = applications.slice((page - 1) * pageSize, page * pageSize);

    const totalApplications = applications.length;

    res.status(200).send({ 
      submissions: paginatedApplications, 
      totalPages: Math.ceil(totalApplications / pageSize),
      currentPage: page 
    });
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
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
        }).populate(["student", "professor", "course", "applicationTemplate"]);
        res.status(200).send({ submissions: submissions });
      } catch (err) {
        res.status(400).send("deleting application failed");
      }
    });

// update a submission
applicationRoutes
    .route("/update-submission")
    .post(userAuth, async function (req, res) {
      try {
        const submission = await Application.findOneAndUpdate(
            { _id: req.body.id },
            {
              $set: {
                responses: req.body.responses,
                submitted: req.body.submitted,
                status: req.body.submitted ? "Submitted" : "",
              },
            }
        );

        if (!submission) {
          res.status(400).send("Application not found");
          return;
        }

        const submissions = await Application.find({
          student: req.user.id,
        }).populate(["student", "professor", "course", "applicationTemplate"]);
        res.status(200).send({ submissions: submissions });
      } catch (err) {
        res.status(400).send("updating application failed");
      }
    });

// update a submission's status
applicationRoutes
    .route("/update-status")
    .post(userAuth, async function (req, res) {
      try {
        const submission = await Application.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { status: req.body.status } }
        );

        if (!submission) {
          res.status(400).send("Application not found");
          return;
        }

        const submissions = await Application.find({
          student: req.user.id,
        }).populate(["student", "professor", "course", "applicationTemplate"]);
        res.status(200).send({ submissions: submissions });
      } catch (err) {
        res.status(400).send("updating application status failed");
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