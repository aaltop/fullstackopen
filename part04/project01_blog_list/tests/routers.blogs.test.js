// The first test run here seems to occasionally result in an 
// ECONNRESET error with code
// -4077, not sure what the cause is yet (it's not consistent,
// best guess would be some rate limit or connection timeout(?)
// with mongoDB Atlas?)

const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const {TEST_SECRET} = require("../utils/env")

const supertest = require("supertest")
const mongoose = require("mongoose")
const {describe, test, after, beforeEach, before} = require("node:test")
const assert = require("node:assert")
const jwt = require("jsonwebtoken")

const api = supertest(app)
const testUser = {
    username: "Anonymous",
    password: "pass",
    name: "John Doe"
}

let userToken = null

function getAuthString(token)
{
    return `Bearer ${token}`
}

before(async () => {
    await User.deleteMany()
    await api.post("/api/users")
        .send(testUser)
        .expect(201)

    console.log("TOP SCOPE BEFORE")
    const numDocs = await User.countDocuments()
    console.log("More than zero users: ", numDocs > 0)

    const loginResponse = await api.post("/api/login")
        .send(testUser)
        .expect(200)
    userToken = loginResponse.body.token
    
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


    // NOTE: This is weird. I don't know exactly how it's supposed to
    // work, but if I don't have this, the top scope before does not
    // run (or does not run completely (?!), as it prints only some of
    // the logged stuff; is it left awaiting? I guess...). 
    // In turn, if I do have this, the top scope does run completely,
    // and the tests are successful? (It)
    //
    // EDIT: For whatever reason, it does seem that the tests don't
    // wait for the top scope "before" to run if this is not here.
    // Obviously I'm curious as to whether I should even have
    // that top scope before, though there is equally a top scope
    // "after", so you'd think it should be okay (the docs say 
    // "This function creates a hook that runs 
    // before executing a suite", and do set it in a "describe" block,
    // but then, why is it allowed/does it run in the top scope,
    // if that should not be allowed?). At the same time,
    // it DOES run if this is here, suggesting that it is sort of
    // supposed to run, but something is scuffed with it.
    //
    // At any rate, the issue seems to be with initialising the
    // database, because once the top scope "before" does appear to
    // run as expected (before everything else here, naturally),
    // then everything seems to work as expected
    beforeEach(async () => {
        const numUsers = await User.countDocuments()
        console.log("More than zero users: ", numUsers > 0)
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
            .set("authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MjI1ODk2OTd9._1zYKnyz8OdENTe4Qj9Rtekk9fmJd40ALtmoPXpfq58`)
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

        // const loginResponse = await api.post("/api/login")
        // .send(testUser)
        // .expect(200)

        // console.log("LOGIN RESPONSE", loginResponse.body.token)
        // const authString = `Bearer ${loginResponse.body.token}`


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