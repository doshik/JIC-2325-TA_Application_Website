require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/User');
const Application = require('./models/Application');
const ApplicationTemplate = require('./models/ApplicationTemplate');
const Course = require('./models/Course');
const InterviewRequest = require('./models/InterviewRequest');

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function generateData() {
  
  const newUser_prof = new User({
    _id: new mongoose.Types.ObjectId(),
    name: "Professor Name",
    email: "professorname@gatech.edu",
    accountType: "professor",
    gtID: "900000001",
    username: "profName01",
    createdAt: Date(),
    professorInfo: {
      courses: ['CS 1331', 'CS 4641']
    },
    adminInfo: {
      courses: ['CS 1331', 'CS 4641']
    },
  });
  
  const newUser_student = new User({
    _id: new mongoose.Types.ObjectId(),
    name: "Student Name",
    email: "studentName@gatech.edu",
    accountType: "student",
    username: "studentName01",
    gtID: "900000000",
    createdAt: Date(),
    studentInfo: {
      year: "3",
      major: "CS",
      coursesTaken: ["CS 1331", "CS 1332", "CS 4641"],
      coursesTaking: ["CS 2340", "CS 2110", "CS 3510"],
      gpa: "3.5",
    },
  });
  
  await newUser_prof.save();
  await newUser_student.save();
  
  console.log('Data generation completed!');
  process.exit(0);
}

generateData().catch((err) => {
  console.error(err);
  process.exit(1);
});
