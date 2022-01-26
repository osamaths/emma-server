const mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var Questions = new Schema(
    {
        question: String,
        type: String,
        options: [String],
    },
    { timestamps: true }
);

// Compile model from schema
module.exports = mongoose.model("questions", Questions);
