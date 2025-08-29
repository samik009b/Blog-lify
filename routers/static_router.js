import express from "express"
const staticRouter = express.Router()

staticRouter.get("/", (req, res) => {
  res.render("home")
})

// show forms
staticRouter.get("/signup", (req, res) => {
  res.render("signup")
})

staticRouter.get("/login", (req, res) => {
  res.render("login")
})

export default staticRouter
