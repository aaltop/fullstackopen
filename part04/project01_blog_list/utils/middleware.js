

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
    }

    response.status(500).end()
}

module.exports = {
    errorHandler
}