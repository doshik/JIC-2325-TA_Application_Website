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
  name: {
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
  password: {
    type: String,
    required: true,
  },
  
  profile_picture_key: {
    type: String,
    default: null
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
