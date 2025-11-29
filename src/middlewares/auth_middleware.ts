import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";

export const verifyToken = catchAsync((req: Request, res: Response, next: NextFunction) => {
    // extracting the token from cookie | authorization-header

    const fromCookie = req.cookies?.token;
    const fromHeader = req.headers.authorization; // supports "Bearer <token>"
    const token = fromCookie || fromHeader;

    // bearer prefix - the standard way
    // const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ error: "token not found" });

    // checks the validity of the token
    const verified = jwt.verify(token, String(process.env.MY_SECRET_KEY));
    req.user = verified;
    next();
});
