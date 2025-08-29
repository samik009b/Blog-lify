import userModel from "../Mongo_DB/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// --------------------------------- SIGNUP ----------------------------------------

export async function getUserSignUp(req, res) {
  try {
    const { name, username, email, password } = req.body

    // hashing the password with bcrypt-js
    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    })

    console.log(`user created: ${user.username}`)
    return res.redirect("/login")
  } catch (err) {
    console.error("user creation failed", err)
    return res.json({ error: "user creation failed" })
  }
}

// ---------------------------------- LOGIN ----------------------------------------

export async function getUserLogin(req, res) {
  try {
    const { username, password } = req.body

    // removing the password parameter as I am hashing password to find the user
    const found_user = await userModel.findOne({ username })

    if (!found_user) {
      console.log("login failed: user not found")
      return res.json({ message: "login failed, user not found" })
    }

    // checking password validity with bcrytp-js instead of finding the pssword from the database itself
    const isPasswordValid = await bcrypt.compare(password, found_user.password)

    if (!isPasswordValid) {
      console.log(`invalid password`)
      res.redirect("/login")
    }

    /* cretaing JSON web token with a secret key for my user authentication the
    id will be used to verify the token later on while fetching user profile */
    const token = jwt.sign(
      {
        id: found_user._id.toString(),
        username: found_user.username,
        email: found_user.email,
        role: found_user.role,
      },
      process.env.MY_SECRET_KEY,
      { expiresIn: "1h" }
    )

    // creating a cookie to send the jwt via the cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      // secure: true, // enable in production with https
      // sameSite: 'lax'
    })
    console.log(token)

    return res.redirect("/blogs")
  } catch (err) {
    console.error("login error -> ", err)
    return res.json({ error: "login failed" })
  }
}

// -------------------------------- USER PROFILE ---------------------------------------

export async function getUserProfile(req, res) {
  try {
    // this id comes from the token that's generated while login
    const userId = req.user.id

    const userProfile = await userModel.findById(userId).select("-password")
    console.log("Decoded JWT payload:", req.user)

    if (!userProfile)
      return res.status(404).json({ error: "profile not found" })

    return res.render("profile", { user: userProfile })
  } catch (error) {
    console.log("error -> ", error)

    return res.json({ error: "failed to fetch user profile" })
  }
}
