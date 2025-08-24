const express = require("express")
const {
  createBlog,
  fetchBlogs,
  fetchBlogByID,
} = require("../controllers/blogController")
const router = express.Router()

// Show all blogs
router.get("/blog-page", fetchBlogs)

// Create new blog
router.post("/blog-page", createBlog)

// Fetch a single blog by blogID
router.get("/blog", fetchBlogByID)

module.exports = router
