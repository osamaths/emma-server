const Questions = require("../models/Questions");

exports.getQuestions = async (req, res) => {
    const questions = await Questions.find();

    res.status(200).send(questions);
};

exports.createQuestion = async (req, res) => {
    const { question, type, options = [] } = req.body;
    const questionData = { question, type, options };

    const questionDoc = await new Questions(questionData).save();
    console.log("createQuestion", questionDoc, "body", questionData);
    res.send(questionDoc);
};
