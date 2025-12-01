import { NextFunction, Request, response, Response } from "express";
import quicker from "../utils/quicker";
import httpResponse from "../utils/http.response";

export default {
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            };

            httpResponse(req, res, 200, "OK", healthData);
        } catch (error) { }
    }
};
