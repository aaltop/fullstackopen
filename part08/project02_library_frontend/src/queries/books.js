import { gql } from "@apollo/client"

const allProps = ["title", "author", "published", "genres"]

function getAll({ getProps = allProps, noGetProps = [] }) {
    const props = noGetProps.length === 0
        ? getProps
        : getProps.filter(prop => !noGetProps.includes(prop))

    return gql`
        query getBooks($author: String, $genre: String) {
            allBooks(author: $author, genre: $genre) {
                ${props.join()}
            }
        }
    `
}

export default {
    getAll
}