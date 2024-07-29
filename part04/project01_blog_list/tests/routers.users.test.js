const app = require("../app")
const User = require("../models/user")

const supertest = require("supertest")
const mongoose = require("mongoose")
const {describe, test, after, beforeEach} = require("node:test")
const assert = require("node:assert")


const api = supertest(app)

// for validating that a user returned by a REST call matches
// the wanted property set
function validateProperties(responseUser)
{
    const expectedProperties = ["username", "name", "id"].sort()
    const userProperties = Object.getOwnPropertyNames(responseUser).sort()
    assert.deepStrictEqual(userProperties, expectedProperties)
}

describe("post /api/users", () => {


    const testUser = {
        username: "Anonymous",
        password: "pass",
        name: "John Doe"
    }

    test("increases the number of documents by one when successful", async () => {
        // avoid problems with unique
        await User.deleteMany()
        const numBefore = await User.countDocuments()
        await api.post("/api/users")
            .send(testUser)
            .expect(201)
        const numAfter = await User.countDocuments()
        assert(numAfter === numBefore + 1)
    })

    // should this be a test for the mongoose model itself, though?
    // I guess sort of not, because the router is the thing that actually
    // handles creating the password hash.
    test("raises 400 error when trying to add a non-unique username", async () => {
        await User.deleteMany()
        await api.post("/api/users")
            .send(testUser)
            .expect(201)
        // just send the same
        await api.post("/api/users")
            .send(testUser)
            .expect(400)
    })

    test("adds a document that can be found with relevant parameters", async () => {
        await User.deleteMany()
        await api.post("/api/users")
            .send(testUser)
            .expect(201)
        let filterUser = {...testUser}
        delete filterUser.password
        assert(await User.exists(filterUser))
    })

    test("raises 400 error when no username specified", async () => {
        await User.deleteMany()
        let exampleUser = {...testUser}
        delete exampleUser.username
        await api.post("/api/users")
            .send(exampleUser)
            .expect(400)
    })

    test("raises 400 error when no password specified", async () => {
        await User.deleteMany()
        let exampleUser = {...testUser}
        delete exampleUser.password
        await api.post("/api/users")
            .send(exampleUser)
            .expect(400)
    })

    // mainly testing that it does not return anything related to 
    // the password, but good to be entirely sure about the return
    test("does not return unwanted values in response body", async () => {
        await User.deleteMany()
        const response = await api.post("/api/users")
            .send(testUser)
            .expect(201)

        validateProperties(response.body)
    })
})


describe("get /api/users", () => {


    const testBlogs = [
        {
            "username": "Anonymous",
            "password": "pass",
            "name": "John Doe"
        },
        {
            "username": "XxShadowKillerxX",
            "password": "word",
        }

    ]
    const numUsers = testBlogs.length

    beforeEach(async () => {
        await User.deleteMany()
        // kind of wacky that I need to call this, as that's
        // where the password hashing is happening. Is this actually
        // the recommended way of doing it?
        const promiseArray = testBlogs.map(blog => {
            return api.post("/api/users")
                .send(blog)
                .expect(201)
        })
        await Promise.all(promiseArray)
    })

    test("returns the expected number of items in a list", async () => {
        const response = await api.get("/api/users")
            .expect(200)
        
        assert.deepEqual(response.body.length, numUsers)
    })

    test("return has correctly formatted user objects", async () => {
        const response = await api.get("/api/users")
            .expect(200)
        
        for (const user of response.body) {
            validateProperties(user)
        }
    })
})



after(async () => {
    await mongoose.connection.close()
})