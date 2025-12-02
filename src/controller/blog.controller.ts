import { Request, Response } from "express";
import { blogModel } from "../models/blogModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export default {
    createBlog: catchAsync(async (req: Request, res: Response) => {
        const { blogName, content } = req.body;
        if (!content) {
            return res.status(400).send("Content is required");
        }

        const createdBlog = await blogModel.create({
            blogName,
            content,
            author: req.user.id
        });

        return res.status(201).json({ success: true, message: "blog created", id: createdBlog._id });
    }),

    getBlogs: catchAsync(async (req: Request, res: Response): Promise<void> => {
        let blog;

        if (req.user.role === "admin") {
            blog = await blogModel.find().populate("author", "name username email").lean().exec();
        } else {
            blog = await blogModel.find({ author: req.user.id }).populate("author", "name username email").lean().exec();
        }
        res.status(200).json({ successs: true, message: "all blogs", blogs: blog });
    })
};
