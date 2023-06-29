var mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {ApplicationTemplateQuestionSchema} from "./ApplicationTemplateQuestion";
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
    type: [ApplicationTemplateQuestionSchema],
    default: [],
  },
  assignedToCourse: {
    type: Boolean,
    default: false
  }
});

ApplicationTemplate = mongoose.model("ApplicationTemplate", applicationTemplateSchema);
module.exports = ApplicationTemplate;