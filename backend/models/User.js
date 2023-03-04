const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accountType: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gtID: { 
    type: String,
    required: true,
  },
  userInfo: {
    type: Object,
    default: {},
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
