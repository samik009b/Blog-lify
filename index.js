const express = require("express")
const dotenv = require("dotenv")
const staticRouter = require("./routers/static_router")
const userRouter = require("./routers/user_router")
const blogRouter = require("./routers/blog_router")
const path = require("path")

dotenv.config()
const app = express()

//connection
const connect_to_mongoDB = require("./Mongo_DB/connection")
connect_to_mongoDB(process.env.MONGO_URI)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => res.render("home"))

// using the routers
app.use("/", staticRouter)
app.use("/", userRouter)
app.use("/", blogRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on ${PORT}`))
