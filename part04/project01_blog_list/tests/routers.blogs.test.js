// The first test run here seems to occasionally result in an 
// ECONNRESET error with code
// -4077, not sure what the cause is yet (it's not consistent,
// best guess would be some rate limit or connection timeout(?)
// with mongoDB Atlas?)

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
    password: "pass",
    name: "John Doe"
}

const wrongUser = {
    username: "hackerman",
    password: "mackerhan",
    name: "Mister Evil"
}

const falseAuthorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MjI1ODk2OTd9._1zYKnyz8OdENTe4Qj9Rtekk9fmJd40ALtmoPXpfq58"

function getAuthString(token)
{
    return `Bearer ${token}`
}

async function initializeLogin()
{
    await User.deleteMany()
    await api.post("/api/users")
        .send(testUser)
        .expect(201)

    await api.post("/api/users")
        .send(wrongUser)
        .expect(201)

    let loginResponse = await api.post("/api/login")
        .send(testUser)
        .expect(200)
    const correctToken = loginResponse.body.token

    loginResponse = await api.post("/api/login")
        .send(wrongUser)
        .expect(200)
    const wrongToken = loginResponse.body.token
    
    return {correctToken, wrongToken}
}

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
    let userToken = null
    let wrongToken = null

    before(async () => {
        const tokens = await initializeLogin()
        userToken = tokens.correctToken
        wrongToken = tokens.wrongToken
    })

    test("returns 401 error if no authorization header", async () => {

        const numBefore = await Blog.countDocuments()

        await api.post("/api/blogs")
            .send(testBlog)
            .expect(401)

        const numAfter = await Blog.countDocuments()
        assert.strictEqual(numBefore, numAfter)
    })

    test("returns 401 error if incorrect authorization token", async () => {

        const numBefore = await Blog.countDocuments()

        await api.post("/api/blogs")
            .set("authorization", `Bearer `)
            .send(testBlog)
            .expect(401)

        await api.post("/api/blogs")
        // I'm actually just going to hope and pray that it never happens
        // to be the same, though it would be kinda funny
            .set("authorization", falseAuthorization)
            .send(testBlog)
            .expect(401)

        const numAfter = await Blog.countDocuments()
        assert.strictEqual(numBefore, numAfter)
    })

    test("Increases the number of blogs by one", async () => {
        // I guess I should actually use this directly
        // rather than using the get
        const numBefore = await Blog.countDocuments()

        assert(await User.countDocuments() > 0)

        // NOTE: could be an issue down the line if the blogs
        // should be unique, but currently no such requirement
        await api.post("/api/blogs")
            .set("authorization", getAuthString(userToken))
            .send(testBlog)
            .expect(201)
        const numAfter = await Blog.countDocuments()
        assert(numAfter === numBefore + 1)
    })

    test("adds a document that can be found with relevant parameters", async () => {
        await Blog.deleteMany()
        await api.post("/api/blogs")
            .set("authorization", getAuthString(userToken))
            .send(testBlog)
            .expect(201)
        assert(await Blog.exists(testBlog))
    })

    test("missing 'title' property results in 400", async () => {
        let tempBlog = {...testBlog}
        delete tempBlog.title
        await api.post("/api/blogs")
            .set("authorization", getAuthString(userToken))
            .send(tempBlog)
            .expect(400)
    })

    test("missing 'url' property results in 400", async () => {
        let tempBlog = {...testBlog}
        delete tempBlog.url
        await api.post("/api/blogs")
            .set("authorization", getAuthString(userToken))
            .send(tempBlog)
            .expect(400)
    })

})

describe("delete /api/blogs/:id", () => {

    const testBlog = {
        title: "test",
        author:"test",
        url: "https://www.google.com/",
        likes: 1
    }

    let id = null
    function urlWithId(id)
    {
        return `/api/blogs/${id}`
    }
    let userToken = null
    let wrongToken = null

    before(async () => {
        const tokens = await initializeLogin()
        userToken = tokens.correctToken
        wrongToken = tokens.wrongToken
    })

    beforeEach(async () => {
        await Blog.deleteMany()
        const response = await api.post("/api/blogs")
            .set("authorization", getAuthString(userToken))
            .send(testBlog)
            .expect(201)

        id = response.body.id
    })

    test("deletes blog from backend", async () => {
        // make sure that it actually is in the database before delete
        assert(await Blog.findById(id))
        await api.delete(urlWithId(id))
            .set("authorization", getAuthString(userToken))
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

        await api.delete(urlWithId(id))
            .set("authorization", getAuthString(userToken))
            .expect(204)

        const numAfter = await Blog.countDocuments()
        assert(numAfter === 1)
    })

    test("returns 401 error if missing authorization token", async () => {
        const numBefore = await Blog.countDocuments()

        await api.delete(urlWithId(id))
            .expect(401)

        const numAfter = await Blog.countDocuments()
        assert.strictEqual(numAfter, numBefore)
    })

    test("returns 401 error if nonexistent authorization token", async () => {
        const numBefore = await Blog.countDocuments()

        await api.delete(urlWithId(id))
            .set("authorization", falseAuthorization)
            .expect(401)

        const numAfter = await Blog.countDocuments()
        assert.strictEqual(numAfter, numBefore)
    })

    // Don't really want to give the ability to query the database
    // for the existence of a blog with a given id, so just send
    // 404 even when the blog exists but the credentials are wrong
    test("returns 404 error if incorrect authorization token", async () => {
        const numBefore = await Blog.countDocuments()

        await api.delete(urlWithId(id))
            .set("authorization", getAuthString(wrongToken))
            .expect(404)

        const numAfter = await Blog.countDocuments()
        assert.strictEqual(numAfter, numBefore)
    })

    test("returns 404 error if a blog with the given id does not exist", async () => {
        const numBefore = await Blog.countDocuments()

        // hardcoding's a little sketchy, but eh
        await api.delete(urlWithId("5a4aaaa71b54a676234d17f8"))
            .set("authorization", getAuthString(userToken))
            .expect(404)

        const numAfter = await Blog.countDocuments()
        assert.strictEqual(numAfter, numBefore)
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