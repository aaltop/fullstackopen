const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: createId } = require("uuid")

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]


const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: String!
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
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (_parent, args) => {
            const { author, genre } = args
            let filteredBooks = books.slice()
            if (author) filteredBooks = filteredBooks.filter(
                book => book.author === author
            )
            if (genre) filteredBooks = filteredBooks.filter(
                book => book.genres.includes(genre)
            )
            return filteredBooks
        },
        allAuthors: () => {
            const bookAuthors = books.map(book => book.author)
            return authors.map(author => {
                return {
                    name: author.name,
                    born: author.born,
                    bookCount: countOccurence(author.name, bookAuthors)
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

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})