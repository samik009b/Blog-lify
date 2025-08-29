import express from "express"
import {
  getUserLogin,
  getUserSignUp,
  getUserProfile,
} from "../controller/user_controller.js"
import { verifyToken } from "../middlewares/auth_middleware.js"

const userRouter = express.Router()

userRouter.get("/profile", verifyToken, getUserProfile)

// handle form submissions
userRouter.post("/signup", getUserSignUp)
userRouter.post("/login", getUserLogin)

export default userRouter
