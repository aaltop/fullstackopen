const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    passwordHash: {
        type: String,
        required: true
    },
    name: String,
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.passwordHash
        delete ret.__v
        if (!Object.hasOwn(ret, "name")) {
            ret.name = null
        }
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User