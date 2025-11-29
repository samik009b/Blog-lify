import { Request, Response } from "express";
import blogModel from "../models/blogModel.js";
import { catchAsync } from "../utils/catchAsync.js";

// ---------------- CREATE BLOG ----------------

export const createBlog = catchAsync(async (req: Request, res: Response) => {
    const { blog_name, content } = req.body;
    if (!content) return res.status(400).send("Content is required");

    const created_blog = await blogModel.create({
        blog_name,
        content,
        author: req.user.id
    });
    console.log(`Blog created: ${created_blog.blog_name}`);
    return res.redirect("/blogs");
});

// ---------------- FETCH BLOGS ----------------

export const getBlogs = catchAsync(async (req: Request, res: Response) => {
    let blog;

    if (req.user.role === "admin") {
        blog = await blogModel.find().populate("author", "name username email");
    } else {
        blog = await blogModel
            .find({ author: req.user.id })
            .populate("author", "name username email");
    }
    res.render("blogs", { blogs: blog });
});
