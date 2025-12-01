import { Request, Response, NextFunction } from "express";
import { THttpError } from "../config/types";

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    const statusCode = err instanceof Error && (err as any).statusCode ? (err as any).statusCode : 500;

    const errorObject: THttpError = {
        success: false,
        statusCode,
        request: {
            ip: req.ip,
            url: req.originalUrl,
            method: req.method
        },
        message: err instanceof Error ? err.message || "Something went wrong" : "Something went wrong",
        data: null,
        trace:
            process.env.NODE_ENV === "production"
                ? null
                : err instanceof Error
                  ? { error: err.stack }
                  : { error: JSON.stringify(err) }
    };

    if (process.env.NODE_ENV === "production") {
        delete errorObject.request.ip;
    }

    return res.status(statusCode).json(errorObject);
}
