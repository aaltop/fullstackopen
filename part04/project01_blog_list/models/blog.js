const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
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