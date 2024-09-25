const server = require("./gqlServer")
const config = require("./utils/config")
const Author = require("./models/author")
const Book = require("./models/book")

const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require("mongoose")

let authors = [
    {
        name: 'Robert Martin',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
    },
    {
        name: 'Sandi Metz', // birthyear not known
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        genres: ['classic', 'revolution']
    },
]

async function initialiseDatabase() {

    // await Author.deleteMany()
    // await Book.deleteMany()
    if (await Author.countDocuments() < 1) {
        console.log("Initialising database with data")
        const dbAuthors = await Author.insertMany(authors)

        // set the id for the author for each book
        const savedBooks = books.map(book => {
            const authorId = dbAuthors.find(aut => aut.name === book.author)._id
            return { ...book, author: authorId }
        })
        const dbBooks = await Book.insertMany(savedBooks)


        // set the books for each author
        dbAuthors.forEach(aut => {
            const filteredBooks = dbBooks.filter(book => book.author.toString() === aut.id)
            console.log(filteredBooks)
            const bookIds = filteredBooks.map(book => book._id)
            console.log(bookIds)
            Author.findByIdAndUpdate(aut.id, { books: bookIds }).exec()
        })
    }
}

console.log("Connecting to MongoDB...")
mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        initialiseDatabase()
    })
    .catch(error => {
        console.log("Error while connecting to MongoDB:", error.message)
    })



startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})