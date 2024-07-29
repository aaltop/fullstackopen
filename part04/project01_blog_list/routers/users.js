const User = require("../models/user")

const express = require("express")
const bcrypt = require("bcryptjs")


const usersRouter = express.Router()
usersRouter.use(express.json())


usersRouter.post("/", async (request, response, next) => {
    const rawUserData = request.body
    const password = rawUserData.password
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


module.exports = usersRouter