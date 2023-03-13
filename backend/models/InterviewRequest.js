const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewRequestSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: "Application",
  },
  possibleTimes: {
    type: Array,
    default: [],
  },
  acceptedTime: {
    type: String,
    default: "",
  },
  meetingLink: {
    type: String,
    default: "",
  },
});

InterviewRequest = mongoose.model("InterviewRequest", interviewRequestSchema);
module.exports = InterviewRequest;
