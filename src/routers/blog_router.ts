import express from "express";
import { verifyToken } from "../middlewares/auth_middleware.js";
import blogController from "../controller/blog.controller.js";

const blogRouter = express.Router();

// Create new blog
blogRouter.post("/blogs", verifyToken, blogController.createBlog);

// Show all blogs
blogRouter.get("/blogs", verifyToken, blogController.getBlogs);

export default blogRouter;
