import express from "express";
import { login, register, profile } from "../docs/user_controller.js";
import { verifyToken } from "../middlewares/auth_middleware.js";

const userRouter = express.Router();

userRouter.get("/profile", verifyToken, profile);
userRouter.post("/signup", register);
userRouter.post("/login", login);

export default userRouter;
