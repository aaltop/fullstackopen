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

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const id = request.params.id
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

// Not replacing all of the data, so use .patch
blogsRouter.patch("/:id", async (request, response, next) => {
    try {
        const id = request.params.id
        const body = request.body
        const newContent = {
            likes: body.likes
        }
        const modifiedBlog = await Blog.findByIdAndUpdate(
            id,
            newContent,
            { new: true, runValidators: true}
        )
        response.status(200).json(modifiedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter