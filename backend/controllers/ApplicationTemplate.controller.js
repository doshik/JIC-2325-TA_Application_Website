const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Application = require("../models/Application.js");
const ApplicationTemplate = require("../models/ApplicationTemplate.js");
const express = require("express");
const applicationTemplateRoutes = express.Router();
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/auth");

// @route POST api/application_templates/save-template
// @desc Professor saves a TA application template
// @access Public
applicationTemplateRoutes
  .route("/save-template")
  .post(userAuth, async function (req, res) {
    try {
      const newTemplate = new ApplicationTemplate({
        name: req.body.name,
        professor: req.user.id,
        questions: req.body.questions,
      });

      const savedTemplate = await newTemplate.save();

      const templates = await ApplicationTemplate.find({
        $or: [{ professor: req.user.id }, { professor: { $exists: false } }]
      });
      res.status(200).send({ templates: templates });
    } catch (err) {
      console.log(err);
      res.status(400).send("adding new application template failed");
    }
  });

// @route GET api/application_templates/get-templates
// @desc Professor gets all own TA application templates
// @access Public
applicationTemplateRoutes
  .route("/get-templates")
  .get(userAuth, async function (req, res) {
    try {
      const templates = await ApplicationTemplate.find({
        $or: [{ professor: req.user.id }, { professor: { $exists: false } }]
      });

      res.status(200).send({ templates: templates });
    } catch (err) {
      res.status(400).send("getting application templates failed");
    }
  });

// delete a template
applicationTemplateRoutes
  .route("/delete-template")
  .post(userAuth, async function (req, res) {
    try {
      const template = await ApplicationTemplate.findOneAndDelete({
        _id: req.body.id,
      });
      if (!template) {
        res.status(400).send("Template not found");
        return;
      }

      const templates = await ApplicationTemplate.find({
        $or: [{ professor: req.user.id }, { professor: { $exists: false } }]
      });
      res.status(200).send({ templates: templates });
    } catch (err) {
      res.status(400).send("deleting application template failed");
    }
  });

// update a template
applicationTemplateRoutes
  .route("/update-template")
  .post(userAuth, async function (req, res) {
    try {
      const template = await ApplicationTemplate.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { questions: req.body.questions, name: req.body.name } }
      );

      if (!template) {
        res.status(400).send("Template not found");
        return;
      }

      const templates = await ApplicationTemplate.find({
        $or: [{ professor: req.user.id }, { professor: { $exists: false } }]
      });
      res.status(200).send({ templates: templates });
    } catch (err) {
      res.status(400).send("updating application template failed");
    }
  });

module.exports = applicationTemplateRoutes;

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
