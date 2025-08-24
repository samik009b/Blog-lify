const express = require("express")
const blogModel = require("../Mongo_DB/blogModel")
const app = express()

// required for request body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// --------------------------------------- CREATE BLOG -------------------------------------

async function createBlog(req, res) {
  const { content, blog_name } = req.body
  try {
    const created_blog = blogModel.create({
      blog_name,
      content,
    })
    console.log(`successfully created blog`)
    return res.render("/blog-page")
  } catch (error) {
    console.log(`problem creating blog`, error)
    return res.sendStatus(500)
  }
}

// ----------------------------------------- GET BLOG ------------------------------------------

async function fetchBlog(req, res) {
  const { blogID } = req.body
  try {
    const found_blog = await blogModel.findOne({ blogID })
    console.log(`successfully fetching blog`)
    return res.json({ found_blog })
  } catch (error) {
    console.log(`problem fetching blog`, error)
    return res.sendStatus(500)
  }
}

module.exports = {
  createBlog,
  fetchBlog,
}
