const ApplicationTemplateQuestionSchema = new mongoose.Schema({
    // the type of the question (multiselect, single answer, file attachment, etc.)
    QuestionType: {
        enum: ['multiselect', 'single answer', 'file attachment']
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