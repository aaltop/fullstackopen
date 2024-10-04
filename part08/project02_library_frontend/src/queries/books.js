import { gql } from "@apollo/client"

const allProps = `
title
published
genres
author {
    name
    born
    bookCount
}
`


const GET_ALL = gql`
    query getBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            ${allProps}
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
                ${allProps}
            }
    }
`

const GET_GENRES = gql`
    query getGenres {
        allBooks {
            genres
        }
    }
`

const BOOK_ADDED = gql`
    subscription bookAdd {
        bookAdded {
            ${allProps}
        }
    }
`

export default {
    GET_ALL,
    ADD_BOOK,
    GET_GENRES,
    BOOK_ADDED
}