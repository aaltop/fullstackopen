const {TOKEN_SECRET} = require("../utils/env")

const jwt = require("jsonwebtoken")

function errorHandler(error, request, response, _next)
{
    // Mongoose schema validation error
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (
        error.name === "MongoServerError"
        && error.message.includes("E11000 duplicate key error")
    ) {
        // can't realistically be sure what the duplicate key was,
        // and in turn, not sure if I should just be sending the whole
        // error message back, doesn't feel like a great idea
        return response.status(400).json({ error: "Encountered duplicate key" })
    } else if (error.name === "JsonWebTokenError") {

        return response.status(401).json({ error: "invalid token" })
    } else if (error.name === "TokenExpiredError") {

        return response.status(401).json({ error: "Expired token" })
    }

    console.log("UNHANDLED ERROR:", error.name)
    console.log(error)
    response.status(500).end()
}

function bearerTokenParser(request, response, next)
{
    const auth = request.get("authorization")
    request.token = null
    if (auth && auth.startsWith("Bearer ")) {
        request.token = auth.replace("Bearer ", "")
    }

    next()
}

function userExtractor(request, response, next)
{
    const decodedToken = jwt.verify(request.token, TOKEN_SECRET)
    // using this middleware means that an id is expected, so if
    // it is not found, the token is assumed to be invalid
    if (!decodedToken.id) {
        return response.status(401).json({ error: "invalid token" })
    }

    request.user = decodedToken.id
    request.username = decodedToken.username
    next()
}

module.exports = {
    errorHandler, bearerTokenParser, userExtractor
}