const mongoose = require("mongoose")

function connect_to_mongoDB(URI) {
  return mongoose
    .connect(URI)
    .then(console.log("database connected"))
    .catch((err) => console.log("error connecting to database", err))
}

module.exports = connect_to_mongoDB
