const express = require("express")
const { getUserLogin, getUserSignUp } = require("../controller/user_controller")

const router = express.Router()

// handle form submissions
router.post("/signup", getUserSignUp)
router.post("/login", getUserLogin)

module.exports = router
