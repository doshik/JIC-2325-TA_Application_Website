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
    template: {
      type: Schema.Types.ObjectId,
      ref: "ApplicationTemplate",
    },
    data: {
      type: Object,
      default: {},
    },
  },

  { timestamps: true }
);

var applicationTemplateSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: {
    type: Array,
    default: [],
  },
});

Application = mongoose.model("Application", applicationSchema);
ApplicationTemplate = mongoose.model(
  "ApplicationTemplate",
  applicationTemplateSchema
);
module.exports = Application;
module.exports = ApplicationTemplate;
