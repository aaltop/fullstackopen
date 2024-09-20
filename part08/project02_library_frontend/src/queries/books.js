import arrayUtils from "../utils/array"

import { gql } from "@apollo/client"

const allProps = ["title", "author", "published", "genres"]

// It's a fun idea, but as I now think about it, I don't think it would
// work. I think the query gets cached based on the name and the
// used variables, but not on the rest of the body. So, I can
// fetch the data using all props, and then with one prop,
// and what will be cached will be just the one-prop version, the cache
// of which will be referenced by the previous all-prop fetch too.
// This obviously isn't very ideal, and in the end I guess the idea
// is (unsurprisingly) to just write set queries. However,
// in this case it almost seems more practical then to just fetch
// all the data as usual, regardless of the situation, basically
// making the ability to choose what is returned per item quite
// pointless, though the option is always good.
//
// In order to not have to write a new function for each case,
// though, I could just make the query name unique by suffixing
// the wanted props in a sorted order (programmatically, that is), 
// so this could still work for that. 
function getAll({ getProps = allProps, noGetProps = [] } = {}) {
    const props = arrayUtils.difference(getProps, noGetProps)

    return gql`
        query getBooks($author: String, $genre: String) {
            allBooks(author: $author, genre: $genre) {
                ${props.join()}
            }
        }
    `
}

function addBook({ getProps = allProps, noGetProps = [] } = {}) {
    const props = arrayUtils.difference(getProps, noGetProps)

    return gql`
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
                    ${props.join()}
                }
        }
    `
}

export default {
    getAll,
    addBook
}