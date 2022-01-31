const mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var Answers = new Schema(
    {
        answers: [
            {
                question: Schema.Types.ObjectId,
                answer: String,
            },
        ],
    },
    { timestamps: true }
);

// Compile model from schema
module.exports = mongoose.model("answers", Answers);
