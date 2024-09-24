import { gql } from "@apollo/client"

const allProps = ["name", "born", "bookCount"].join()


const GET_ALL = gql`
    query getAuthors {
        allAuthors { ${allProps} }
    }
`

const EDIT_BIRTH = gql`
    mutation editBirth($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            ${allProps}
        }
    }
`

export default {
    GET_ALL,
    EDIT_BIRTH
}