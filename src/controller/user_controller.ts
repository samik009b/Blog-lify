import { IUser, userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { apiError } from "../utils/error";
import { createAccessToken, createRefreshToken } from "../utils/token";

type U = Pick<IUser, "name" | "username" | "password" | "email">;
export const register = catchAsync(async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body as U;

    for (const [key, value] of Object.entries({ name, username, email, password })) {
        if (!value || typeof value !== "string" || value.trim() === "") {
            return res.status(400).json({ success: false, message: `${key} is required` });
        }
    }

    const doesUserExist = await userModel.findOne({ $or: [{ email }, { username }] });
    if (doesUserExist) {
        const field = doesUserExist.email ? "Email" : "Username";
        return res.status(400).json({ success: false, message: `${field} taken` });
    }

    const user = await userModel.create({ name, username, email, password });
    const accessToken = createAccessToken(username);
    const refreshToken = createRefreshToken(username);

    return res.status(201).json({
        success: true,
        message: "user created",
        user: {
            name: user.name,
            email: user.email,
            tokens: { accessToken, refreshToken }
        }
    });
    // throw new ApiResponse(201, true, "user created", user);
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body as U;

    for (const [key, value] of Object.entries({ username, password })) {
        if (!value || value.trim() === "" || typeof value !== "string") {
            return res.status(400).json({ success: false, message: `${key} is required` });
        }
    }

    const existedUser = await userModel.findOne({ username });

    if (!existedUser) {
        return res.json({ success: false, message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existedUser.password);

    if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "invalid password" });
    }

    const refreshToken = createRefreshToken(username);
    const accessToken = createAccessToken(username);

    const cookieOptions = {
        httpOnly: true,
        maxAge: parseInt(process.env.COOKIE_MAX_AGE as string)
    };

    res.cookie("token", refreshToken, cookieOptions);

    return res.status(200).json({
        success: true,
        message: "logged in",
        token: { accessToken, refreshToken }
    });
});

export const profile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ success: false, message: "not logged in" });
    }

    const userProfile = await userModel.findById(userId).select("-password -v -_id");

    if (!userProfile) {
        return res.status(404).json({ error: "profile not found" });
    }

    return res.status(200).json({
        success: true,
        message: "user found",
        user: userProfile
    });
});
