const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Application = require("../models/Application.js");
const ApplicationTemplate = require("../models/ApplicationTemplate.js");
const FileAttachment = require("../models/FileAttachment.js");

const s3 = require('../middleware/multer');
const express = require("express");
const applicationRoutes = express.Router();
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
require("dotenv").config();
const { userAuth } = require("../middleware/auth");
const Busboy = require('busboy');
const formidable = require('formidable');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

// @route POST api/application/upload-file
// @desc Student uploads a file for TA application submission
// @access Public
applicationRoutes
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
        
        res.status(200).send({ fileAttachment: newFileAttachment });
      } catch (err) {
        console.log(err);
        res.status(400).send("file upload failed");
      }
    });
  });

// @route POST api/application/save-submission
// @desc Student saves a TA application submission
// @access Public
applicationRoutes
  .route("/save-submission")
  .post(userAuth, async function (req, res) {
    const form = new formidable({ multiples: false });
    console.log("endpoint hit");

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).send("Error parsing the request");
    
      try {
        const file = files.file;
        let file_attachment_id = null;
        if (file) {
          const fileData = fs.readFileSync(file.path);
          const fileKey = Date.now().toString() + "_" + file.name;
          console.log("endpoint hit");
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
          file_attachment_id = newFileAttachment._id;
        }
        const parsedResponses = JSON.parse(fields.responses);
        const parsedCourse = JSON.parse(fields.course);
        const parsedSubmitted = JSON.parse(fields.submitted);

        const newSubmission = new Application({
          student: req.user.id,
          professor: parsedCourse.professor,
          course: parsedCourse._id,
          applicationTemplate: parsedCourse.applicationTemplate,
          responses: parsedResponses,
          submitted: parsedSubmitted,
          status: parsedSubmitted ? "Submitted" : "",
          attachment: file_attachment_id, // reference to the file attachment
        });

        await newSubmission.save();

        const submissions = await Application.find({
          student: req.user.id,
        }).populate(["student", "professor", "course", "applicationTemplate"]);

        res.status(200).send({ submissions: submissions });
      } catch (err) {
        console.log(err);
        res.status(400).send("adding new application failed");
      }
    });
  });

  // @route GET api/file/download/:id
// @desc Download a file by its FileAttachment ID
// @access Public
applicationRoutes
.route("/file/download/:id")
.get(async function (req, res) {
  try {
    // Fetch the file attachment from the database
    const fileAttachment = await FileAttachment.findById(req.params.id);

    if (!fileAttachment) {
      return res.status(404).send("File not found");
    }

    console.log("Getting file with key: ", fileAttachment.Key)
    const params = {
      Bucket: "user-data", 
      Key: fileAttachment.key,
    };

    // Get the file from S3 and stream it to the client
    s3.getObject(params)
      .createReadStream()
      .on('error', function(err){
        res.status(500).json({error:"Error -> " + err});
      }).pipe(res);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
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

        console.log(req.body)

          switch (req.body.status) {
              case 'Hired':
                  await transporter.sendMail({
                  from: process.env.MAIL_USERNAME,
                  to: req.body.email,
                  subject: 'TA Application Update for ' + req.body.course,
                  text: 'Congrats, you have been hired! ' +
                      '\n The professor or TA team will be in contact with you shortly to give you more information.'
              }, (err) => {
                  res.status(400).send('Mail error: ' + err.message)
                  return;
              });
                  break;
                  case 'Interview':
                  await transporter.sendMail({
                      from: process.env.MAIL_USERNAME,
                      to: req.body.email,
                      subject: 'TA Application Update for ' + req.body.course,
                      html: 'You have been selected for an interview! Please <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/dashboard">log in</a> as soon as possible to schedule your interview.'
                  }, (err) => {
                      res.status(400).send('Mail error: ' + err.message)
                      return;
                  });
                  break;
              default:
                  await transporter.sendMail({
                      from: process.env.MAIL_USERNAME,
                      to: req.body.email,
                      subject: 'TA Application Update for ' + req.body.course,
                      html: 'There has been an update for your application, <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/dashboard">click here</a> to learn more.'
                  }, (err) => {
                      res.status(400).send('Mail error: ' + err.message)
                      return;
                  });
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