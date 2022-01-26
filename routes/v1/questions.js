var express = require("express");
const { getQuestions, createQuestion } = require("../../controllers/QuestionsController");
var router = express.Router();

router.route("/").get(getQuestions).post(createQuestion);

module.exports = router;
