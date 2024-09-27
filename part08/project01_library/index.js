const server = require("./gqlServer")
const config = require("./utils/config")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

require("dotenv").config()

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
    context: async ({ req, res }) => {
        console.log("Creating context")
        const auth = req ? req.headers.authorization : null

        if (auth && auth.startsWith('Bearer ')) {

            try {
                const decodedToken = jwt.verify(
                    auth.substring(7), process.env.JWT_SECRET
                )
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser }

            } catch (error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    return {}
                }
                throw error
            }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})