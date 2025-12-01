import { Request, Response } from "express";
import { THttpResponse } from "../config/types";

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: res.statusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    };

    if (process.env.NODE_ENV === "production") delete response.request.ip;

    // log
    res.status(responseStatusCode).json(response);
};
