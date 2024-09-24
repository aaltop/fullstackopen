import { gql } from "@apollo/client"

const allProps = ["title", "author", "published", "genres"]


const GET_ALL = gql`
    query getBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            ${allProps.join()}
        }
    }
`

const ADD_BOOK = gql`
    mutation addBook(
            $title: String!
            $author: String!
            $published: Int!
            $genres: [String!]!
        ) {
            addBook(
                title: $title
                author: $author
                published: $published
                genres: $genres
            )
            {
                ${allProps.join()}
            }
    }
`

export default {
    GET_ALL,
    ADD_BOOK
}