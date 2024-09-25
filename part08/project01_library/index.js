const server = require("./gqlServer")
const config = require("./utils/config")

const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require("mongoose")

console.log("Connecting to MongoDB...")
mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error while connecting to MongoDB:", error.message)
    })



startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})