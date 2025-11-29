import mongoose from "mongoose";

export const dbConnect = async (URI: string): Promise<void> => {
    try {
        const conn = await mongoose.connect(URI);
        console.log("Database connected:", conn.connection.host);
    } catch (err) {
        console.error("Error connecting to database:", err);
        throw err;
    }
};
