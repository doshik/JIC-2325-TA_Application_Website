var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var applicationSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    professor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    applicationTemplate: {
      type: Schema.Types.ObjectId,
      ref: "ApplicationTemplate",
    },
    responses: {
      type: Array,
      default: [],
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    }
  },

  { timestamps: true }
);

Application = mongoose.model("Application", applicationSchema);
module.exports = Application;