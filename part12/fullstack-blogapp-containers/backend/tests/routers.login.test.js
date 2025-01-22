const app = require("../app")
const User = require("../models/user")

const assert = require("node:assert")
const {describe, test, after, beforeEach, before} = require("node:test")

const supertest = require("supertest")
const mongoose = require("mongoose")


const api = supertest(app)

const testUser = {
    username: "Anonymous",
    password: "pass",
    name: "John Doe",
    blogs: []
}

const testUserCred = {
    username: testUser.username,
    password: testUser.password
}

before(async () => {
    await User.deleteMany()

    await api.post("/api/users")
        .send(testUser)
        .expect(201)
})

describe("post /api/login", () => {

    test("returns body with token when given correct login credentials", async () => {

        const response = await api.post("/api/login")
            .send(testUserCred)
            .expect(200)

        assert(Object.hasOwn(response.body, "token"))
    })

    test("returns a 401 error and no token when given incorrect username", async () => {

        const response = await api.post("/api/login")
            .send({...testUserCred, username: testUserCred.username.concat("1")})
            .expect(401)

        assert(!Object.hasOwn(response.body, "token"))
    })

    test("returns a 401 error and no token when given incorrect password", async () => {

        const response = await api.post("/api/login")
            .send({...testUserCred, password: testUserCred.password.concat("1")})
            .expect(401)
        
        assert(!Object.hasOwn(response.body, "token"))
    })
})



after(async () => {
    await mongoose.connection.close()
})