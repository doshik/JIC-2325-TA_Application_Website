const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Application = require("../models/Application.js");
const ApplicationTemplate = require("../models/ApplicationTemplate.js");
const express = require("express");
const courseRoutes = express.Router();
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/auth");

// @route POST api/course/create
// @desc Create a new course
// @access Public
courseRoutes.route("/create").post(async function (req, res) {
  try {
    const newCourse = new Course({
      courseId: req.body.courseId,
      courseTitle: req.body.courseTitle,
      professor: "640fbf027649f186652b1b3b",
      applicationTemplate: null,
      active: req.body.active,
      description: req.body.description
    });

    const finalCourse = await newCourse.save();
    res.status(200).json({ course: finalCourse });
  } catch (err) {
    console.log(err);
    res.status(400).send("adding new course failed");
  }
});

// @route GET api/course/prof/get
// @desc Get a professors courses
// @access Public
courseRoutes.route("/prof/get").get(userAuth, async function (req, res) {
  try {
    const courses = await Course.find({ professor: req.user.id }).populate(
      "applicationTemplate"
    );

    if (courses) {
      res.status(200).json({ courses: courses });
    } else {
      res.status(400).send("getting courses failed");
    }
  } catch (err) {
    res.status(400).send("getting courses failed");
  }
});

// @route GET api/course/student/get
// @desc Get a students courses
// @access Public
courseRoutes.route("/student/get").get(userAuth, async function (req, res) {
  try {
    const courses = await Course.find({ active: true }).populate(
      ["applicationTemplate", "professor"]
    );

    if (courses) {
      res.status(200).json({ courses: courses });
    } else {
      res.status(400).send("getting courses failed");
    }
  } catch (err) {
    res.status(400).send("getting courses failed");
  }
});

// @route GET api/course/prof/get
// @desc Get a professors courses
// @access Public
courseRoutes.route("/prof/getacourse").get(userAuth, async function (req, res) {
  try {
    const courses = await Course.findOne(
      // { professor: req.user.id },
      { courseId: req.body.courseId }
    ).populate(
      "applicationTemplate"
    );

    console.log(req.body);

    if (courses) {
      res.status(200).json({ courses: courses });
    } else {
      res.status(400).send("getting courses failed");
    }
  } catch (err) {
    res.status(400).send("getting courses failed");
  }
});

// update course
courseRoutes.route("/update").post(userAuth, async function (req, res) {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          active: req.body.active,
          applicationTemplate: req.body.applicationTemplate ?? null,
          description: req.body.description
        },
      },
      { new: true }
    );

    if (!course) {
      res.status(400).send("Course not found");
    }

    const courses = await Course.find({ professor: req.user.id }).populate(
      "applicationTemplate"
    );
    res.status(200).json({ courses: courses });
  } catch (err) {
    console.log(err);
    res.status(400).send("updating course failed");
  }
});

module.exports = courseRoutes;
