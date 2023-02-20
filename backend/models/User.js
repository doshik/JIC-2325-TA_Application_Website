const mongoose = require("mongoose");
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

  gtID: { 
    type: String,
    required: true,
  },

  professorInfo: {
      type: Object
  }, 

  studentInfo: {}, 

  adminInfo: {},

});

const User = mongoose.model("User", userSchema);
module.exports = User;