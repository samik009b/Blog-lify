const blogModel = require("../Mongo_DB/blogModel")

// ---------------- CREATE BLOG ----------------

async function createBlog(req, res) {
  const { blog_name, content } = req.body
  if (!content) return res.status(400).send("Content is required")

  try {
    const created_blog = await blogModel.create({ blog_name, content })
    console.log(`Blog created: ${created_blog.blog_name}`)
    return res.redirect("/blog-page")
  } catch (error) {
    console.log("Error creating blog:", error)
    return res.sendStatus(500)
  }
}

// ---------------- FETCH BLOGS ----------------

async function fetchBlogs(req, res) {
  try {
    const blogs = await blogModel.find().sort({ _id: -1 })
    return res.render("blogs", { blogs })
  } catch (error) {
    console.log("Error fetching blogs:", error)
    return res.sendStatus(500)
  }
}

// ---------------- FETCH SINGLE BLOG ----------------

async function fetchBlogByID(req, res) {
  const { blogID } = req.query // use query string: /blog-page?blogID=123
  try {
    const found_blog = await blogModel.findOne({ blogID })
    if (!found_blog) return res.status(404).send("Blog not found")
    return res.json(found_blog)
  } catch (error) {
    console.log("Error fetching blog:", error)
    return res.sendStatus(500)
  }
}

module.exports = {
  createBlog,
  fetchBlogs,
  fetchBlogByID,
}
