const {TOKEN_SECRET} = require("../utils/env")

const jwt = require("jsonwebtoken")


function verifyToken(token)
{
    return jwt.verify(token, TOKEN_SECRET)
}

module.exports = {
    verifyToken
}