var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ApplicationSchema = new mongoose.Schema({

  name: {
      type: String,
      defualt: "default"
    },

  professorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },

  default: {
      type: Boolean, 
      default: true
  },

  description: {
      type: String,
      default: ""
  },

  assignedCourse: { 
      type: Schema.Types.ObjectId, ref: "Course" 
  },

  questions : [{
    _id: 0,
    written: {type: Boolean, default: false},
    questionPrompt: String,
    options: [{
      optionText : String,
      _id: 0
    }],
    response: {type: String, default: ""},
    }],

 }, {timestamps: true});

Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application; 