const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const InterviewRequest = require('./models/InterviewRequest');
const Application = require('./models/Application');
const ApplicationTemplate = require('./models/ApplicationTemplate');
const { application } = require('express');


require("dotenv").config();
console.log('Connecting to MongoDB... ' + process.env.mongoURI);
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function generateData() {
  const profFilter = { username: "profName01" };
  const profUpdate = {
    name: "Professor Name",
    email: "professorname@gatech.edu",
    accountType: "professor",
    gtID: "900000001",
    createdAt: Date(),
    userInfo: {
      courses: ['CS 1331', 'CS 4641']
    },
    adminInfo: {
      courses: ['CS 1331', 'CS 4641']
    },
  };

  const studentFilter = { username: "studentName01" };
  const studentUpdate = {
    name: "Student Name",
    email: "studentName@gatech.edu",
    accountType: "student",
    gtID: "900000000",
    createdAt: Date(),
    userInfo: {
      year: "3",
      major: "CS",
      coursesTaken: ["CS 1331", "CS 1332", "CS 4641"],
      coursesTaking: ["CS 2340", "CS 2110", "CS 3510"],
      gpa: "3.5",
    },
  };

  const newUser_prof = await User.findOneAndUpdate(profFilter, profUpdate, {
    new: true,
    upsert: true
  });

  const newUser_student = await User.findOneAndUpdate(studentFilter, studentUpdate, {
    new: true,
    upsert: true
  });

  const courseFilter = { courseId: "CS 1331" };
  const courseUpdate = {
    courseId: "CS 1331",
    courseName: "Intro to Object Oriented Programming",
    courseDescription: "This course teaches the fundamentals of object oriented programming.",
    professor: newUser_prof,
    application: "appID01",
    active: true
  };

  const newCourse = await Course.findOneAndUpdate(courseFilter, courseUpdate, {
    new: true,
    upsert: true
  });
  

  const application_template_filter = { professor: profFilter._id, name: "Application Template 1"};
  const application_template_update = {
    name: "Application Template 1",
    professor: newUser_prof,
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
  };
  
  const newApplicationTemplate = await ApplicationTemplate.findOneAndUpdate(application_template_filter, application_template_update, {
    new: true,
    upsert: true
  });

  const interviewRequestFilter = { student: studentUpdate._id, professor: profUpdate._id };
  const interviewRequestUpdate = {
    student: newUser_student,
    professor: newUser_prof,
    course: newCourse,
    possibleTimes: ["2021-04-01T12:00:00.000Z", "2021-04-02T12:00:00.000Z"],
    acceptedTime: "2021-04-01T12:00:00.000Z",
    meetingLink: "https://gatech.bluejeans.com/123456789",
  };
  
  console.log('newUser_student._id', newUser_student._id);
  console.log('newUser_prof._id', newUser_prof._id);
  console.log(interviewRequestUpdate)
  await InterviewRequest.findOneAndUpdate(interviewRequestFilter, interviewRequestUpdate, 
    {
      new: true,
      upsert: true
    }
  );
  
  const applicationFilter = { student: newUser_student._id, professor: newUser_prof._id };
  const applicationUpdate = {
    student: newUser_student,
    professor: newUser_prof,
    course: newCourse,
    submitted: true,
    applicationTemplate: newApplicationTemplate,
    responses: [
      {
        questionPrompt: "What is your GPA?",
        response: "3.5",
      },
      {
        questionPrompt: "Why do you want to join this course?",
        response: "I want to learn more about object oriented programming.",
      },
    ],
  };
  
  await Application.findOneAndUpdate(applicationFilter, applicationUpdate, {
    new: true,
    upsert: true
  });
  
  const availableCourses = ["CS 1331", "CS 1332", "CS 4641"];
  for (let i = 0; i < 50; i++) {
    let username = `user${Math.floor(Math.random() * 10000)}`; // generates user followed by a random 4 digit number
    let email = `${username}@example.com`;
    let name = `Name ${Math.floor(Math.random() * 10000)}`; // generates Name followed by a random 4 digit number
    let studentFilter = { username: username };
    let studentUpdate = {
      name: name,
      email: email,
      accountType: "student",
      gtID: `id_${Math.floor(Math.random() * 100000)}`, // generates id_ followed by a random 5 digit number
      createdAt: Date(),
      userInfo: {
        year: (Math.floor(Math.random() * 4) + 1).toString(), // generates a random number between 1 and 4
        major: "CS",
        coursesTaken: availableCourses.sort(() => .5 - Math.random()).slice(0,2), // randomly picks courses from the list
        coursesTaking: availableCourses.sort(() => .5 - Math.random()).slice(0,2), // randomly picks courses from the list
        gpa: (Math.random() * (4 - 2) + 2).toFixed(2), // generates a random GPA between 2 and 4
      },
    };
  
    const newUser_student = await User.findOneAndUpdate(studentFilter, studentUpdate, {
      new: true,
      upsert: true
    });
  
    const applicationUpdate = {
      student: newUser_student,
      professor: newUser_prof,
      course: newCourse,
      submitted: true,
      applicationTemplate: newApplicationTemplate,
      responses: [
        {
          questionPrompt: "What is your GPA?",
          response: newUser_student.userInfo.gpa,
        },
        {
          questionPrompt: "Why do you want to join this course?",
          response: `I want to learn more. ${Math.random() > 0.5 ? 'Also, I have interest in this course.' : ''}`, // random sentence generation
        },
      ],
    };
  
    await Application.findOneAndUpdate(applicationFilter, applicationUpdate, {
      new: true,
      upsert: true
    });
  }
  
  

  console.log('Data generation completed!');
  process.exit(0);
}

//Now generate random users and add applications along with them

generateData().catch((err) => {
  console.error(err);
  process.exit(1);
});
