var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var fileAttachmentSchema = new Schema(
    {
        application: {
            type: Schema.Types.ObjectId,
            ref: "Application",
        },
        file_url: {
            type: String,
            required: true,
        },
        file_name: {
            type: String,
            required: true,
        },
        file_type: {
            type: String,
            required: true,
        },
        file_size: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

FileAttachment = mongoose.model("FileAttachment", fileAttachmentSchema);
module.exports = FileAttachment;