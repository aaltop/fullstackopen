import authorQuery from "../queries/authors"
import loginActions from "../loginState"

import UpdateAuthor from "./UpdateAuthor"

import { useQuery } from "@apollo/client"


const Authors = ({ show }) => {
    const { loading, error, data } = useQuery(authorQuery.GET_ALL)


    if (!show) return null
    if (loading) return <>Loading...</>
    if (error) return <>Error : {error.message}</>

    // seems a little inpractical that I'd need to always know
    // what the shape of the data is in this way. At least in this case
    // I should just be able to take the data, and that would be
    // the array of authors. Doable, of course, but I'm not sure
    // whether it necessary makes sense to do a fix down the line
    // when the queries are more complex.
    const authors = data.allAuthors

    const authorUpdate = !(loginActions.getLoginState())
        ? null
        : <><h2>Update Author</h2>
        <UpdateAuthor authors={authors} /></>

    return (
        <div>
        <h2>authors</h2>
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
            </tr>
            {authors.map((a) => (
                <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {authorUpdate}
        </div>
    )
}

export default Authors
