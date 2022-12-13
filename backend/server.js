const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const User = require('./models/User');
const Course = require('./models/Course');
const Application = require('./models/Application');

var app = express();
const router = express.Router();
const db = process.env.mongoURI;

var bodyParser = require('body-parser')
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      limit: "500mb",
      extended: false,
    })
  );
  app.use(bodyParser.json({ limit: "500mb" }));
  

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// 

app.post("/newAccount", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "A user account with that email already exists." });
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
          course1
          .save()
          .catch((err) => console.log(err));

          defaultApp.save().catch((err) => console.log(err));
          course2.application = defaultApp._id;
          course2
          .save()
          .catch((err) => console.log(err));

          newAccount.professorInfo.courses = {"CS4641": course1._id, "CS7641": course2._id};
          newAccount
          .save()
          .then((newAccount) => {
              console.log(newAccount);
              res.json("Account for " + newAccount.name + " has been created! Their ID is " + newAccount._id + " \n Their courses are: " + newAccount.professorInfo.courses["CS4641"] + " and " + newAccount.professorInfo.courses["CS7641"]);
          })
          .catch((err) => console.log(err));
      }
  });
});

app.post("/addNewApplication", (req, res) => {

  const newApplication = new Application({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      professorId:  mongoose.Types.ObjectId(req.body.professorId),
      default: false,
      description: req.body.description,
      assignedCourse: req.body.assignedCourse,
      questions: req.body.questions,
  });

  newApplication
  .save()
  .then((newApplication) => {
      console.log(newApplication);
      res.json(newApplication.name + " has been created by " + newApplication.professorId + "! \n The application ID is " + newApplication._id);
  })
  .catch((err) => console.log(err));

});

app.post("/assignApplicationToCourse", (req, res) => {
  console.log(req.body.courseId)
  Course
  .findById
  (mongoose.Types.ObjectId(req.body.courseId))
  .then((course) => {
      console.log(course)
      course.application = mongoose.Types.ObjectId(req.body.applicationId);
      course
      .save()
      .then((course) => {
          console.log(course);
          res.json("Application " + course.application + " has been assigned to course " + course.name + "!");
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
});

app.post("/editApplication", (req, res) => {
  Application
  .findById
  (req.body.applicationId)
  .then((application) => {
      application.name = req.body.name;
      application.description = req.body.description;
      application.questions = req.body.questions;
      application
      .save()
      .then((application) => {
          console.log(application);
          res.json("Application " + application.name + " has been updated!");
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
});

app.listen(3000, () => console.log('TA Application Server is listening on port 3000.'));