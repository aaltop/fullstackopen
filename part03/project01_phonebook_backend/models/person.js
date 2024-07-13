require("dotenv").config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({

    name: {
        type: String,
        minLength: 3,
        required: [true, "Person name is required"]
    },
    number: {
        type: String,
        validate: {
            validator: function(number_str)
            {
                // number should
                //  - have length of 8 or more
                //  - be formed of two parts that are separated by -,
                // the first part has two or three numbers
                // and the second part also consists of numbers
                return (8 <= number_str.length) && /^\d{2,3}-\d+$/
            },
            message: "Number should be at least 8 characters long, with 2-3 numbers, a dash and at least one other number"
        },
        required: [true, "Person number is required"]
    }
})

personSchema.set("toJSON", {
    flattenObjectIds: true,
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

personSchema.methods.print = function () {
    console.log(`${this.name} ${this.number}`)
}

module.exports = mongoose.model('Person', personSchema)
