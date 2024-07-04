require("dotenv").config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set("toJSON", {
    flattenObjectIds: true,
    transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

personSchema.methods.print = function () {
    console.log(`${this.name} ${this.number}`)
}

module.exports = mongoose.model('Person', personSchema)
