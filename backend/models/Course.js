const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: "Application",
  },
  acceptingApplications: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
