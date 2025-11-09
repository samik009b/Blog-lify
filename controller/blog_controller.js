import blogModel from "../Mongo_DB/blogModel.js"

// ---------------- CREATE BLOG ----------------

export async function createBlog(req, res) {
  const { blog_name, content } = req.body
  if (!content) return res.status(400).send("Content is required")

  try {
    const created_blog = await blogModel.create({
      blog_name,
      content,
      author: req.user.id,
    })
    console.log(`Blog created: ${created_blog.blog_name}`)
    return res.redirect("/blogs")
  } catch (error) {
    console.log("Error creating blog:", error)
    return res.sendStatus(500)
  }
}

// ---------------- FETCH BLOGS ----------------

export async function fetchBlogs(req, res) {
  let blog
  try {
    if (req.user.role === "admin") {
      blog = await blogModel.find().populate("author", "name username email")
    } else {
      blog = await blogModel
        .find({ author: req.user.id })
        .populate("author", "name username email")
    }
    res.render("blogs", { blogs: blog })
  } catch (error) {
    console.error("/n/n EJS render error:", error)
    res.status(500).json({ error: "blog is not found " })
  }
}
