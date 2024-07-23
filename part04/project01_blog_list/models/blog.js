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
    likes: Number
})

blogSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        if (!Object.hasOwn(ret, "likes")) {
            ret.likes = 0
        }
        return ret
    }
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog