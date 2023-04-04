const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: "ApplicationTemplate",
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
