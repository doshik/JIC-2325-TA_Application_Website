var mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

ApplicationTemplate = mongoose.model("ApplicationTemplate", applicationTemplateSchema);
module.exports = ApplicationTemplate;