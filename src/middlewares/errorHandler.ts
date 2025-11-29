import { NextFunction, Request, Response } from "express";
import { apiError } from "../utils/error";

export const errorHandler = (
    err: Error | apiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // api-errors
    if (err instanceof apiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    // db-errors
    if ((err && err.name === "MongoNetworkError") || err.name === "MongooseServerSelectionError") {
        return res.status(503).json({
            success: false,
            message: "database connection issue"
        });
    }
    // server-errors
    return res.status(500).json({
        success: false,
        message: "internal server error"
    });
};
