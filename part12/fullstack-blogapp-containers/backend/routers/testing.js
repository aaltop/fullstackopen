const User = require("../models/user")
const Blog = require("../models/blog")

const express = require("express")

const testingRouter = express.Router()
testingRouter.use(express.json())

testingRouter.post("/reset", async (request, response, next) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter