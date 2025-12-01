import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, required: true, ref: "userModel" },
    blogName: { type: String, default: "New blog" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    likedBy: { type: Number, default: 0 }
});

export const blogModel = model("blogModel", blogSchema, "blogs");
