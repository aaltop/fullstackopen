const User = require("../models/user")

const express = require("express")
const bcrypt = require("bcryptjs")


const usersRouter = express.Router()
usersRouter.use(express.json())


usersRouter.post("/", async (request, response, next) => {
    const rawUserData = request.body
    const password = rawUserData.password
    if (!password) {
        return response.status(400).json({ error: "password required" })
    }
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        delete rawUserData.password
        const userData = {...rawUserData, passwordHash: passwordHash}
        const user = new User(userData)
        const result = await user.save()
        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }   
})

usersRouter.get("/", async (request, response, next) => {
    const users = await User.find()
    response.json(users)
})


module.exports = usersRouter