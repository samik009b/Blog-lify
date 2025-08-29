import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  blog_name: {
    type: String,
    default: "New blog",
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    ref: "userModel",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
})

const blogModel = mongoose.model("blogModel", blogSchema, "blogs")
export default blogModel
