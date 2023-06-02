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
  const users = await User.insertMany(
    Array.from({ length: 20 }, () => ({
      accountType: faker.random.arrayElement(['student', 'professor']),
      username: faker.internet.userName(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      gtID: faker.datatype.uuid(),
      userInfo: {},
    }))
  );

  const courses = await Course.insertMany(
    Array.from({ length: 5 }, (_, i) => ({
      courseId: `CS${i + 100}`,
      courseTitle: faker.lorem.words(3),
      professor: faker.random.arrayElement(users)._id,
      description: faker.lorem.paragraph(),
      semester: 'Spring 2023',
      active: faker.datatype.boolean(),
    }))
  );

  const applicationTemplates = await ApplicationTemplate.insertMany(
    Array.from({ length: 20 }, () => ({
      name: faker.lorem.words(2),
      professor: faker.random.arrayElement(users)._id,
      questions: Array.from({ length: 5 }, () => faker.lorem.sentence()),
      assignedToCourse: faker.datatype.boolean(),
    }))
  );

  const applications = await Application.insertMany(
    Array.from({ length: 20 }, () => ({
      student: faker.random.arrayElement(users)._id,
      professor: faker.random.arrayElement(users)._id,
      course: faker.random.arrayElement(courses)._id,
      applicationTemplate: faker.random.arrayElement(applicationTemplates)._id,
      responses: Array.from({ length: 5 }, () => faker.lorem.sentence()),
      submitted: faker.datatype.boolean(),
      status: faker.random.arrayElement(['accepted', 'pending', 'rejected']),
    }))
  );

  const interviewRequests = await InterviewRequest.insertMany(
    Array.from({ length: 15 }, () => ({
      student: faker.random.arrayElement(users)._id,
      professor: faker.random.arrayElement(users)._id,
      course: faker.random.arrayElement(courses)._id,
      possibleTimes: Array.from({ length: 3 }, () => faker.date.future().toISOString()),
      acceptedTime: faker.date.future().toISOString(),
      meetingLink: faker.internet.url(),
    }))
  );
  
  console.log('Data generation completed!');
  process.exit(0);
}

generateData().catch((err) => {
  console.error(err);
  process.exit(1);
});
