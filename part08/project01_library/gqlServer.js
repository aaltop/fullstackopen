const Author = require("./models/author")
const Book = require("./models/book")

const { ApolloServer } = require('@apollo/server')
const mongoose = require("mongoose")
const { GraphQLError } = require("graphql")

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

function countOccurence(occurenceOf, occurenceIn) {
    return occurenceIn.filter(arrayItem => arrayItem === occurenceOf).length
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

            return await Book.find(filter).populate("author").exec()

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
        }
    },
    Mutation: {
        addBook: async (_parent, { title, author, published, genres }) => {

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
        editAuthor: async (_parent, { name, setBornTo }) => {
            return await Author.findOneAndUpdate({ name }, { born: setBornTo }, { returnDocument: "after" })
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
        }
        console.log(`Uncaught ${error.name}:`)
        console.log(JSON.stringify(error))
        return error
    }
})

module.exports = server