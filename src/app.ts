import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user_router.js";
import blogRouter from "./routers/blog_router.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => res.send("hello"));

// Routers
app.use("/", userRouter);
app.use("/", blogRouter);

export default app;
