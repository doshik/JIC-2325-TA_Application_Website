const InterviewRequest = require("../models/InterviewRequest.js");
const User = require("../models/User.js");

const express = require("express");
const applicationRoutes = express.Router();
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/auth");

// @route POST api/interview/prof/create
// @desc Professor creates an interview request
// @access Public
applicationRoutes
  .route("/prof/create")
  .post(userAuth, async function (req, res) {
    try {
      console.log(req.body);
      const newInterviewRequest = new InterviewRequest({
        student: req.body.student,
        professor: req.user.id,
        course: req.body.course,
        possibleTimes: req.body.possibleTimes,
        acceptedTime: "",
        meetingLink: req.body.meetingLink,
      });

      const savedRequest = await newInterviewRequest.save();

      if (savedRequest) {
        res.status(200).json({ savedRequest: savedRequest });
      } else {
        // console.log();
        res.status(400).send("adding new interview request failed");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("adding new interview request failed");
    }
  });

// @route GET api/interview/student/get
// @desc Student gets all interview requests
// @access Public
applicationRoutes
  .route("/student/get")
  .get(userAuth, async function (req, res) {
    try {
      const interviewRequests = await InterviewRequest.find({student: req.user.id,}).populate(["student", "professor", "course"]);

      if (interviewRequests) {
        res.status(200).json({ interviewRequests: interviewRequests });
      } else {
        res.status(400).send("getting interview requests failed");
      }
    } catch (err) {
      res.status(400).send("getting interview requests failed");
    }
  });

// @route GET api/interview/prof/get
// @desc Prof gets all interview requests
// @access Public
applicationRoutes
.route("/prof/get")
.get(userAuth, async function (req, res) {
  try {
    const interviewRequests = await InterviewRequest.find({professor: req.user.id,}).populate(["student", "professor", "course"]);

    if (interviewRequests) {
      res.status(200).json({ interviewRequests: interviewRequests });
    } else {
      res.status(400).send("getting interview requests failed");
    }
  } catch (err) {
    res.status(400).send("getting interview requests failed");
  }
});

// @route POST api/interview/student/accept
// @desc Student accepts an interview request
// @access Public
applicationRoutes
  .route("/student/accept")
  .post(userAuth, async function (req, res) {
    try {
      console.log(req.body);
      const finalizedRequest = await InterviewRequest.findOneAndUpdate(
        { student: req.user.id, _id: req.body.interviewRequestId },
        { $set: { acceptedTime: req.body.acceptedTime } },
        { new: true }
      );

      const allRequests = await InterviewRequest.find({
        student: req.user.id,
      });

      if (finalizedRequest && allRequests) {
        res.status(200).json({ finalizedRequest: allRequests });
      } else {
        console.log("hi");

        res.status(400).send("accepting interview request failed");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("accepting interview request failed");
    }
  });

// @route DELETE api/interview/delete/:id
// @desc Delete an interview request
// @access Public
applicationRoutes
.route("/delete/:id")
.delete(userAuth, async function (req, res) {
  try {
    const deletedRequest = await InterviewRequest.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedRequest) {
      res.status(200).json({ deletedRequest: deletedRequest });
    } else {
      res.status(400).send("deleting interview request failed");
    }
  } catch (err) {
    res.status(400).send("deleting interview request failed");
  }
});

module.exports = applicationRoutes;
