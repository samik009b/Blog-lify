const express = require("express")
const blogModel = require("../Mongo_DB/blogModel") // adjust path
const blogRouter = express.Router()

// Display all blogs at /blog-page
blogRouter.get("/blog-page", async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ _id: -1 }) // latest first
    res.render("blogs", { blogs }) // renders views/blogs.ejs
  } catch (err) {
    console.error(err)
    res.send("Error fetching blogs")
  }
})

// Optional: Create new blog (for admin or user)
blogRouter.post("/blog-page", async (req, res) => {
  try {
    const { blog_name, content } = req.body
    const blog = await blogModel.create({ blog_name, content })
    return res.redirect("/blog-page")
  } catch (err) {
    console.error(err)
    return res.send("Error creating blog")
  }
})

module.exports = blogRouter
