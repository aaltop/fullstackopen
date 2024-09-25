const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
})

schema.set("toObject", {
    transform: (_doc, ret) => {
        ret.bookCount = ret.books.length
        return ret
    }
})

module.exports = mongoose.model('Author', schema)