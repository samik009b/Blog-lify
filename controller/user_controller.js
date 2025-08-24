const userModel = require("../Mongo_DB/userModel")

// -------------------------------------- SIGNUP --------------------------------------------------
async function getUserSignUp(req, res) {
  try {
    const { name, username, email, password } = req.body

    const user = await userModel.create({
      name,
      username,
      email,
      password,
    })

    console.log(`user created: ${user.username}`)
    return res.redirect("/login")
  } catch (err) {
    console.error("user creation failed", err)
    return res.json({ error: "user creation failed" })
  }
}

// --------------------------------------- LOGIN --------------------------------------------------
async function getUserLogin(req, res) {
  try {
    const { username, password } = req.body

    const found_user = await userModel.findOne({ username, password })

    if (!found_user) {
      console.log("login failed: user not found")
      return res.redirect("/signup")
    }

    console.log(`login success: ${found_user.username}`)
    return res.redirect("/blog-page")
  } catch (err) {
    console.error("login error", err)
    return res.json({ error: "login failed" })
  }
}

module.exports = {
  getUserLogin,
  getUserSignUp,
}
