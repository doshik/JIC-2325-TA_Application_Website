var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var  noteSchema = new Schema({
    message: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }, 

    username: {
        type: String,
        required: true
    },

    application: {
        type: Schema.Types.ObjectId,
        ref: "Application"
    }
});

Note = mongoose.model("Note", noteSchema);
module.exports = Note;