import { gql } from "@apollo/client"


export default {
    GET_ALL: gql`
        query getAuthors {
            allAuthors { name, born, bookCount }
        }
    `
}