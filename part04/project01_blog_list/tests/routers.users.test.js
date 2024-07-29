const app = require("../app")
const User = require("../models/user")

const supertest = require("supertest")
const mongoose = require("mongoose")
const {describe, test, after, beforeEach} = require("node:test")
const assert = require("node:assert")


const api = supertest(app)

describe("post /api/users", () => {


    const testUser = {
        username: "Anonymous",
        password: "pass",
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
})







after(async () => {
    await mongoose.connection.close()
})