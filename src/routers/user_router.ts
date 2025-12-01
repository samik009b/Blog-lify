import express from "express";
import { login, register, profile } from "../controller/user_controller.js";
import { verifyToken } from "../middlewares/auth_middleware.js";
import healthController from "../controller/health.controller.js";

const userRouter = express.Router();

userRouter.route('/self')
userRouter.route('/health',healthController.health )

userRouter.get("/profile", verifyToken, profile);
userRouter.post("/signup", register);
userRouter.post("/login", login);

export default userRouter;
