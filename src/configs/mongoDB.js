var mongoose = require("mongoose");
const configs = require("./index");
const databaseName = configs.database[process.env.NODE_ENV || "development"]?.name;

module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to %s", databaseName));
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
    uri: `mongodb://127.0.0.1:27017/${databaseName}`,
    name: databaseName,
};
