const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const { ApolloServer } = require('@apollo/server')
const mongoose = require("mongoose")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

function countOccurence(occurenceOf, occurenceIn) {
    return occurenceIn.filter(arrayItem => arrayItem === occurenceOf).length
}

function checkAuthorization(context) {
    if (!context.currentUser) throw new GraphQLError("Unauthorized mutation", {
        extensions: {
            code: "UNAUTHORIZED"
        }
    })
}

const resolvers = {
    Query: {
        bookCount: async () => Book.countDocuments(),
        authorCount: async () => Author.countDocuments(),
        allBooks: async (_parent, args) => {

            const { author, genre } = args

            // define filter
            let filter = {}
            if (author) {
                const authorId = (await Author.findOne({ name: author }).exec()).id
                if (!authorId) return { data: { allBooks: [] } }
                filter = { author: authorId }
            }
            if (genre) filter = { ...filter, genres: genre }

            let books = await Book.find(filter).populate("author").exec()
            books = books.map(book => ({ ...book.toObject(), author: book.author.toObject() }))

            return books

        },
        allAuthors: async () => {

            // apparently no better way to do it than this,
            // no built-in thing in mongoose to directly return
            // them as objects? .lean doesn't do the transform
            const authors = (await Author.find()).map(aut => aut.toObject())
            return authors.map(author => {
                return {
                    name: author.name,
                    born: author.born,
                    bookCount: author.bookCount
                }
            })
        },
        me: async (_parent, _args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (_parent, { title, author, published, genres }, context) => {

            checkAuthorization(context)

            let authorDoc = await Author.findOne({ name: author })
            if (!authorDoc) {
                const newAuthor = new Author({ name: author })
                authorDoc = await newAuthor.save()
            }

            const newBook = new Book({ title, author: authorDoc._id, published, genres })
            const createdBook = await newBook.save()

            authorDoc.books = authorDoc.books.concat(createdBook._id)
            authorDoc.save()

            return createdBook.populate("author")

        },
        editAuthor: async (_parent, { name, setBornTo }, context) => {

            checkAuthorization(context)

            return await Author.findOneAndUpdate({ name }, { born: setBornTo }, { returnDocument: "after" })
        },
        createUser: async (_parent, { username, favoriteGenre }) => {
            const user = new User({ username, favoriteGenre })
            const id = (await user.save()).id
            return { username, favoriteGenre, id }
        },
        login: async (_parent, { username, password }) => {
            const user = await User.findOne({ username })

            // likely highly unnecessary, but just trying to keep in mind
            // timing attacks
            let incorrect = !user
            incorrect ||= password !== "secret"
            if (incorrect) {
                throw new GraphQLError("Incorrect username or password", {
                    code: "BAD_USER_INPUT"
                })
            }

            const tokenData = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(tokenData, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (_formattedError, error) => {
        error = error.originalError
        if (error instanceof mongoose.Error.ValidationError) {
            return new GraphQLError(error.message, {
                extensions: {
                    code: "BAD_INPUT",
                }
            })
        } else if (error.name === "MongoServerError") {
            switch (error.code) {
                case 11000: {
                    return new GraphQLError("The item being added has a non-unique field already found in the database", {
                        extensions: {
                            code: "DUPLICATE_KEY",
                            keyValue: error.keyValue
                        }
                    })
                }
            }

        } else if (error instanceof GraphQLError) {
            // assume that the error is thrown in the user code,
            // so just let it pass
            return error
        }
        console.log(`Uncaught ${error.name}:`)
        console.log(JSON.stringify(error))
        console.log(JSON.stringify(_formattedError))
        return error
    }
})

module.exports = server