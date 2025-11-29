import express from "express";
import { createBlog, getBlogs } from "../controller/blog_controller.js";
import { verifyToken } from "../middlewares/auth_middleware.js";

const blogRouter = express.Router();

// Create new blog
blogRouter.post("/blogs", verifyToken, createBlog);

// Show all blogs
blogRouter.get("/blogs", verifyToken, getBlogs);

export default blogRouter;
