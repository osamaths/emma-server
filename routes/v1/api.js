const express = require("express");
const questionsRouter = require("./questions");
const answersRouter = require("./answers");

const app = express();

app.use("/v1/questions", questionsRouter);
app.use("/v1/answers", answersRouter);

module.exports = app;
