const Blog = require("../models/blog")
const User = require("../models/user")
const middleware = require("../utils/middleware")
const {TOKEN_SECRET} = require("../utils/env")

const express = require("express")
const jwt = require("jsonwebtoken")


const blogsRouter = express.Router()
blogsRouter.use(express.json())
blogsRouter.use(middleware.bearerTokenParser)

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate("user")
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

    try {
        
        const decodedToken = jwt.verify(request.token, TOKEN_SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "invalid token" })
        }

        let blogObject = request.body
        let blogCreator = await User.findById(decodedToken.id)
        blogObject.user = blogCreator._id

        const blog = new Blog(blogObject)
        const result = await blog.save()

        blogCreator.blogs = blogCreator.blogs.concat(result._id)
        await blogCreator.save()

        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete("/:id", async (request, response, next) => {
    try {

        const decodedToken = jwt.verify(request.token, TOKEN_SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "invalid token" })
        }

        const id = request.params.id
        const blog = await Blog.findById(id)

        // Don't really want to give the ability to query the database
        // for the existence of a blog with a given id, so just send
        // 404 even when the blog exists but the credentials are wrong.
        // An issue is that the the blog needs to be non-null before
        // the second part can be determined, and if the second part
        // takes long to evaluate, there could be a possibility for
        // a timing attack. Shouldn't really take that long, though.
        if (!blog || !(blog.user.toString() === decodedToken.id.toString())) {
            return response.status(404).end()
        }

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