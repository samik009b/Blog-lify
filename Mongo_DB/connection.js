import mongoose from "mongoose"

export default function connect_to_mongoDB(URI) {
  return mongoose
    .connect(URI)
    .then(() => console.log("database connected"))
    .catch((err) => console.log("error connecting to database", err))
}
