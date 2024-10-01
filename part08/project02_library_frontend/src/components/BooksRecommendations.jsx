import booksQuery from "../queries/books"
import BooksTable from "./BooksTable"

import { useQuery } from "@apollo/client"


export default function Recommendations({ userData, show })
{

    const queriedBooks = useQuery(booksQuery.GET_ALL,
        { variables: { genre: userData.favoriteGenre } }
    )

    if (!show) return null
    if (queriedBooks.loading) return <>Loading...</>
    if (queriedBooks.error) return <>Error: {queriedBooks.message}</>

    const books = queriedBooks.data.allBooks

    return <div>
        <h2>Recommendations</h2>
        {`Books in your favorite genre ${userData.favoriteGenre}`}
        <BooksTable books={books} />
    </div>
}