import { Request, Response } from "express";
import { THttpResponse } from "../config/types";

export default (req: Request, res: Response, statusCode: number, msg: string, data: unknown = null): void => {
  const response: THttpResponse = {
    success: true,
    statusCode: res.statusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message: msg,
    data: data
  };

  if (process.env.NODE_ENV === "production") delete response.request.ip;

  // log
  res.status(statusCode).json(response);
};
