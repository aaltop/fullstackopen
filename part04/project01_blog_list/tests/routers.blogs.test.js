const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")

const supertest = require("supertest")
const mongoose = require("mongoose")
const {describe, test, after, beforeEach, before} = require("node:test")
const assert = require("node:assert")


const api = supertest(app)
const testUser = {
    username: "Anonymous",
    passwordHash: "$2a$10$rTF93JOhkjuQH.YTulTXzuypHbidKXTKhutIO9WRrbTXcWUlYdzo.",
    name: "John Doe",
    _id: "66a76abe395794810ce7faef"
}

before(async () => {
    if (!(await User.findOne())) {
        await (new User(testUser)).save()
    }
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12,
        __v: 0
    }  
]


describe("get /api/blogs", () => {

    beforeEach(async () => {
        await Blog.deleteMany()
        const promiseArray = blogs.map(blog => {
            const blogModel = new Blog(blog)
            return blogModel.save()
        })
        await Promise.all(promiseArray)
    })

    test("Returns JSON content", async () => {
        await api.get("/api/blogs")
            .expect("Content-Type", /json/)
    })

    test("Returns correct number of blogs", async () => {
        const response = await api.get("/api/blogs")
        const responseArray = response.body
        assert.strictEqual(blogs.length, responseArray.length)
    })

})

describe("post /api/blogs", () => {

    const testBlog = {
        title: "test",
        author:"test",
        url: "https://www.google.com/",
        likes: 1
        
    }

    test("Increases the number of blogs by one", async () => {
        // I guess I should actually use this directly
        // rather than using the get
        const numBefore = await Blog.countDocuments()
        // NOTE: could be an issue down the line if the blogs
        // should be unique, but currently no such requirement
        await api.post("/api/blogs")
            .send(testBlog)
            .expect(201)
        const numAfter = await Blog.countDocuments()
        assert(numAfter === numBefore + 1)
    })

    test("adds a document that can be found with relevant parameters", async () => {
        await Blog.deleteMany()
        await api.post("/api/blogs")
            .send(testBlog)
            .expect(201)
        assert(await Blog.exists(testBlog))
    })

    test("missing 'title' property results in 400", async () => {
        let tempBlog = {...testBlog}
        delete tempBlog.title
        await api.post("/api/blogs")
            .send(tempBlog)
            .expect(400)
    })

    test("missing 'url' property results in 400", async () => {
        let tempBlog = {...testBlog}
        delete tempBlog.url
        await api.post("/api/blogs")
            .send(tempBlog)
            .expect(400)
    })

})

describe("delete /api/blogs/:id", () => {

    const testBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "test",
        author:"test",
        url: "https://www.google.com/",
        likes: 1
    }

    const id = testBlog._id
    const urlWithId = `/api/blogs/${id}`

    beforeEach(async () => {
        await Blog.deleteMany()
        await (new Blog(testBlog)).save()
    })

    test("deletes blog from backend", async () => {
        // make sure that it actually is in the database before delete
        assert(await Blog.findById(id))
        await api.delete(urlWithId)
            .expect(204)
        assert(!(await Blog.findById(id)))
    })

    test("decreases document count by one", async () => {
        await (new Blog({
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        })).save()

        const numBefore = await Blog.countDocuments()
        assert(numBefore === 2)

        await api.delete(urlWithId)
            .expect(204)

        const numAfter = await Blog.countDocuments()
        assert(numAfter === 1)
    })

})

describe("patch /api/blogs/:id", () => {

    const testBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "test",
        author: "test",
        url: "https://www.google.com/",
        likes: 1
    }
    const id = testBlog._id
    const urlWithId = `/api/blogs/${id}`

    beforeEach(async () => {
        await Blog.deleteMany()
        await (new Blog(testBlog)).save()
    })

    test("modifies the 'likes' count correctly", async () => {

        const newLikes = 5
        const modifiedBlog = {...testBlog, likes: newLikes}

        const response = await api.patch(urlWithId)
            .send(modifiedBlog)
            .expect(200)
        const returnedBlog = response.body
        assert(returnedBlog.likes === newLikes)
    })

    // liable to change in the future, I guess, but currently only
    // likes should be changeable using patch
    test("does not modify values besides 'likes'", async () => {


        const modifiedBlog = {   
            title: "new title",
            author: "new author",
            url: "https://www.bing.com/",
            likes: 1
        }
        // get the correct form before patch attempt
        let expectedBlog = await Blog.findById(id)
        // Not the best, I guess I should define toObject()?
        expectedBlog = JSON.parse(JSON.stringify(expectedBlog))

        const response = await api.patch(urlWithId)
            .send(modifiedBlog)
            .expect(200)
        const returnedBlog = response.body

        assert.deepStrictEqual(returnedBlog, expectedBlog)
    })
})

describe("Returned blog object", () => {


    const testBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
    }

    beforeEach(async () => {
        await Blog.deleteMany()
        blogModel = new Blog(testBlog)
        await blogModel.save()
    })

    test("has 'id' field rather than '_id' field", async () => {
        const response = await api.get("/api/blogs")
        const blog = response.body[0]
        assert(Object.hasOwn(blog, "id"))
        assert(!Object.hasOwn(blog, "_id"))
    })

    test("has missing 'likes' field default to zero likes", async () => {
        const response = await api.get("/api/blogs")
        const blog = response.body[0]
        assert(blog.likes === 0)
    })

})

after(async () => {
    await mongoose.connection.close()
})