import "./env.loader";

import app from "./app";
import { dbConnect } from "./config/connection";
import { logger } from "./utils/logger";
import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URI;
async function startServer() {
    try {
        await dbConnect(String(mongo_url));
        logger.info("database connected to :: " + mongoose.connection.host);

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
            logger.info(`Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error: any) {
        logger.error("failed to start server");
        logger.error(error);
        process.exit(1);
    }
}
startServer();
