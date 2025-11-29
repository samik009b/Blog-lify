import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await userModel.create({
        name,
        username,
        email,
        password: hashedPassword
    });

    console.log(`user created: ${user.username}`);
    return res.redirect("/login");
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const found_user = await userModel.findOne({ username });

    if (!found_user) {
        console.log("login failed: user not found");
        return res.json({ message: "login failed, user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, found_user.password);

    if (!isPasswordValid) {
        console.log(`invalid password`);
        res.redirect("/login");
    }

    const createdToken = jwt.sign(
        {
            id: found_user._id.toString(), 
            username: found_user.username,
            email: found_user.email,
            role: found_user.role
        },
        process.env.MY_SECRET_KEY as string,
        { expiresIn: "1h" }
    );

    res.cookie("token", createdToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    });
    console.log(createdToken);

    return res.redirect("/blogs");
});

export const profile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const userProfile = await userModel.findById(userId).select("-password");
    console.log("Decoded JWT payload:", req.user);

    if (!userProfile) return res.status(404).json({ error: "profile not found" });

    return res.render("profile", { user: userProfile });
});
