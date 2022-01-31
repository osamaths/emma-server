var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var apiRouter = require("./routes/v1/api");
const mongoDB = require("./configs/mongoDB");

mongoDB.connect();

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

//To allow cross-origin requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", apiRouter);

module.exports = app;
