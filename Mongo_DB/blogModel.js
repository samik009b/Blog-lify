const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const blogSchema = new mongoose.Schema({
  blog_name: {
    type: String,
    default: "New blog",
  },
  content: {
    type: String,
    required: true,
  },
  blogID: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
})

const blogModel = mongoose.model("blogModel", blogSchema, "blogs")
module.exports = blogModel
