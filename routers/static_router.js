const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("home")
})

// show forms
router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/login", (req, res) => {
  res.render("login")
})

module.exports = router
