const { default: mongoose } = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")

const { ApolloServer } = require('@apollo/server')
const { v1: createId } = require("uuid")

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
        bookCount: Book.countDocuments,
        authorCount: Author.countDocuments,
        allBooks: async (_parent, args) => {

            const { author, genre } = args

            // define filter
            let filter = {}
            if (author) {
                const authorId = (await Author.findOne({ name: author }).exec()).id
                console.log(author, authorId)
                if (!authorId) return { data: { allBooks: [] } }
                filter = { author: authorId }
            }
            if (genre) filter = { ...filter, genres: genre }
            console.log(filter)

            const filteredBooks = await Book.find().populate("author").exec()
            console.log(filteredBooks)
            return filteredBooks.filter(book => {
                const pass = (
                    (filter.author ? book.author.id === filter.author : true)
                    && (filter.genres ? book.genres.includes(filter.genres) : true)
                )


                return pass
            })
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
        addBook: (_parent, { title, author, published, genres }) => {
            const newBook = { title, author, published, id: createId(), genres }
            books = books.concat(newBook)

            const authorIdx = authors.findIndex(aut => aut.name === author)
            if (-1 === authorIdx) { // add author if not yet in collection
                authors = authors.concat({ name: author, bookCount: 1, id: createId() })
            } else { // otherwise update bookCount
                const updatedAuthors = authors.slice()
                const updatedAuthor = updatedAuthors[authorIdx]
                updatedAuthors[authorIdx] = {
                    ...updatedAuthor,
                    bookCount: updatedAuthor.bookCount + 1
                }
                authors = updatedAuthors
            }

            return newBook
        },
        editAuthor: (_parent, { name, setBornTo }) => {
            const authorIdx = authors.findIndex(auth => auth.name === name)
            if (-1 === authorIdx) return null
            const editedAuthor = { ...authors[authorIdx], born: setBornTo }
            const newAuthors = authors.slice()
            newAuthors[authorIdx] = editedAuthor
            authors = newAuthors.slice()
            return editedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

module.exports = server