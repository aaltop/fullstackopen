const Blog = require("../models/blog")

const express = require("express")
const blogsRouter = express.Router()


blogsRouter.use(express.json())

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (expection) {
        next(expection)
    }
})

module.exports = blogsRouter