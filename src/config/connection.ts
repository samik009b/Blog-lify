import mongoose from "mongoose";
import  logger  from "../utils/logger";

export const dbConnect = async (URI: string): Promise<void> => {
    try {
        const conn = await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        logger.info("Database connected: " + conn.connection.host);
    } catch (err) {
        logger.error("Error connecting to database: " + err);
        throw err;
    }
};
