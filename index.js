import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./routers/user_router.js"
import blogRouter from "./routers/blog_router.js"
import staticRouter from "./routers/static_router.js"
import dotenv from "dotenv"
import path from "path"

dotenv.config()
const app = express()

//connection
import connect_to_mongoDB from "./Mongo_DB/connection.js"
connect_to_mongoDB(process.env.MONGO_URI)

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static(path.join(process.cwd(), "utils")))

app.get("/", (req, res) => res.render("home"))

// using the routers
app.use("/", userRouter)
app.use("/", blogRouter)
app.use("/", staticRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`server started on http://localhost:${PORT}`)
)
