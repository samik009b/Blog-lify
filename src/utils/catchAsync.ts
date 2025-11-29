import { NextFunction, Request, Response } from "express";

export const catchAsync = (theFunc: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // try-catch handler
        Promise.resolve(theFunc(req, res, next)).catch(next);
    };
};
