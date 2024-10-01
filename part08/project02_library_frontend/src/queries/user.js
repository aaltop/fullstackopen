import { gql } from "@apollo/client"

const userProps = ["username", "favoriteGenre"].join()

const LOGIN = gql`
    mutation userLogin($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

const GET_USER = gql`
    query getUser {
        me {
            ${userProps}
        }
    }
`


export default {
    LOGIN,
    GET_USER
}