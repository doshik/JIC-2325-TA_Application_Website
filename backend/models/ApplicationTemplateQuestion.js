var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationTemplateQuestionSchema = new Schema({
    // the type of the question (multiselect, single answer, file attachment, etc.)
    questionType: {
        type: String,
        enum: ['Multiselect', 'Short Answer', 'File Attachment']
    },

    questionText: { 
        type: String
    },

    // used if the question type is "multiselect"
    options: { 
        type: [String]
    }, 
  });

  module.exports = ApplicationTemplateQuestionSchema;