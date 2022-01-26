var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var http = require("http");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/v1/api");

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/emma";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    //don't show the log when it is test
    console.log("Connected to %s", mongoDB);
    console.log("App is running ... \n");
    console.log("Press CTRL + C to stop the process. \n");
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();
const port = 5000;

app.listen(port, (err) => {
    if (err) {
        return console.log("something bad happened", err);
    }

    console.log(`server is listening on ${port}`);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/", apiRouter);

module.exports = app;
