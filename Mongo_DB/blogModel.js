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
  // author is the reference to the user from userModel
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
})

const blogModel = mongoose.model("blogModel", blogSchema, "blogs")
export default blogModel
