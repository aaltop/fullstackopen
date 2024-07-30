const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "'title' is required"]
    },
    author: String,
    url: {
        type: String,
        required: [true, "'url' is required"]
    },
    likes: Number,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

blogSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        if (!Object.hasOwn(ret, "likes")) {
            ret.likes = 0
        }
        return ret
    }
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog