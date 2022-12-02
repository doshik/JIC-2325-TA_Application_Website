const mongoose = require("mongoose");
// const Activity = require("./Activity");
// const Generator = require("./Generator");
// const Dataset = require("./Dataset");
const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  accountType: {
    type: String, 
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  }, 
  professorInfo: {
    type: Object
  }, 
  studentInfo: {}, 
  adminInfo: {},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
