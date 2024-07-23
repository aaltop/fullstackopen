const logger = require("./utils/logger")
const blogsRouter = require("./routers/blogs")
const {errorHandler} = require("./utils/middleware")

const express = require('express')
const app = express()
const cors = require('cors')
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

app.use(cors())
app.use("/api/blogs", blogsRouter)

app.use(errorHandler)

module.exports = app