const User = require("../models/user")
const {TOKEN_SECRET} = require("../utils/env")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const express = require("express")


const loginRouter = express.Router()
loginRouter.use(express.json())


loginRouter.post("/", async (request, response, next) => {
    const {username, password} = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    // I guess the point is that it's better to not divulge which
    // was incorrect
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "Incorrect username or password"
        })
    }

    const token = jwt.sign(
        {
            username,
            id: user._id
        },
        TOKEN_SECRET,
        {expiresIn: "4h"}
    )

    response.status(200).json({ token })

    
})

module.exports = loginRouter