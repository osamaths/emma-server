var express = require("express");
const { getAnswers, submitAnswers } = require("../../controllers/AnswersController");
var router = express.Router();

router.route("/").get(getAnswers).post(submitAnswers);

module.exports = router;
