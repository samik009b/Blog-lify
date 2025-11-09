import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user_router.js";
import blogRouter from "./routers/blog_router.js";
import staticRouter from "./routers/static_router.js";
import connect_to_mongoDB from "./Mongo_DB/connection.js";
import dotenv from "dotenv";

import path from "path";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { fileURLToPath } from "url"; // <-- needed for __dirname replacement

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read swagger JSON
const swaggerPath = path.resolve(__dirname, "./docs/swagger-docs.json");
const swaggerDocs = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

const app = express();

// MongoDB connection
connect_to_mongoDB(process.env.MONGO_URI);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(process.cwd(), "utils")));

app.get("/", (req, res) => res.render("home"));

// Routers
app.use("/", userRouter);
app.use("/", blogRouter);
app.use("/", staticRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(`Server started on http://localhost:${PORT}`)
);
