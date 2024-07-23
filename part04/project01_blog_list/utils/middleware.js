

function errorHandler(error, request, response, _next)
{
    // Mongoose schema validation error
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    response.status(500).end()
}

module.exports = {
    errorHandler
}