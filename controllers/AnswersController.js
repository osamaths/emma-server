const Answers = require("../models/Answers");

exports.getAnswers = async (req, res) => {
    const answers = await Answers.find().populate({
        path: "answers",
        populate: {
            path: "question",
            model: "questions",
        },
    });
    res.status(200).send(answers);
};

exports.submitAnswers = async (req, res) => {
    const { answers = [] } = req.body;
    const data = [];

    for (const q_id in answers) {
        const answer = answers[q_id];
        data.push({
            question: q_id,
            answer,
        });
    }

    const answerDoc = await new Answers({ answers: data }).save();
    res.send(answerDoc);
};
