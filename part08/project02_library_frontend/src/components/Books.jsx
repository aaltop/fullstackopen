import bookQuery from "../queries/books"

import { useQuery } from "@apollo/client"


const Books = ({ show }) => {
  
    const { loading, error, data } = useQuery(bookQuery.getAll({ noGetProps: ["genres"] }))
  
    if (!show) return null
    if (loading) return <>Loading...</>
    if (error) return <>Error: { error.message }</>

    const books = data.allBooks

    return (
        <div>
        <h2>books</h2>

        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
            {books.map((a) => (
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}

export default Books
