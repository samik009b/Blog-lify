import express from "express";
import { verifyToken } from "../middlewares/auth_middleware.js";
import userController from "../controller/user.controller.js";
import healthController from "../controller/health.controller.js";

const userRouter = express.Router();

userRouter.route("/self");
userRouter.get("/health", healthController.health);

userRouter.get("/profile", verifyToken, userController.profile);
userRouter.post("/signup", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;
