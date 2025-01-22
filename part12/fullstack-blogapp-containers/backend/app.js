const logger = require("./utils/logger")
const blogsRouter = require("./routers/blogs")
const usersRouter = require("./routers/users")
const loginRouter = require("./routers/login")
const testingRouter = require("./routers/testing")
const middleware = require("./utils/middleware")

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require("morgan")
const mongoose = require('mongoose')
const config = require("./utils/config")

mongoose.set("strictQuery", false)

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        logger.error("Error connecting to MongoDB:", error.message)
    })

app.use(morgan("tiny"))
app.use(cors())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    app.use("/api/testing", testingRouter)
}


app.use(middleware.errorHandler)

module.exports = app