import bookQuery from "../queries/books"

import { useQuery } from "@apollo/client"
import { useState } from "react"


const Books = ({ show }) => {
  
    const [genre, setGenre] = useState("")
    const { loading, error, data } = useQuery(bookQuery.GET_ALL, {
        variables: { genre: genre}
    })
    // having to do a separate one because if I get the genres
    // from the filtered list of books, I'm obviously going to just
    // get the genres in that list. Not entirely sure whether having this
    // as a second sub-query in GET_ALL would work (feels like the idea
    // would be to just use one query per component, just but all
    // the queries in there). It might
    // just cache the stuff, or it only caches the result
    // of the top-level query?
    const { loading: genresLoading, error: genresError, data: genresData } = useQuery(bookQuery.GET_GENRES)
  
    if (!show) return null
    if (loading || genresLoading) return <>Loading...</>
    if (error) return <>Error: { error.message }</>
    if (genresError) return <>Error: {genresError.message}</>

    const books = data.allBooks
    const genres = genresData.allBooks

    const genresSet = new Set()
    genres.forEach(obj => obj.genres.forEach(genre => {
        genresSet.add(genre)
    }))

    return (
        <div>
        <h2>books</h2>
        
        <label>
            {"Genre "}
            <select
                name="genre"
                value={genre}
                onChange={ev => setGenre(ev.target.value)}
            >
                <option value=""></option>
                {[...genresSet].map(genre => <option key={genre} value={genre}>{genre}</option>)}
            </select>
        </label>

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
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}

export default Books
