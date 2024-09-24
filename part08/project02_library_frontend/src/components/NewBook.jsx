import bookQuery from "../queries/books"

import { useState } from 'react'
import { useMutation } from '@apollo/client'

const NewBook = ({ show }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])
    const [addBook, { data, loading, error }] = useMutation(
        bookQuery.ADD_BOOK, 
        {
            variables: {
                title, author, published: parseInt(published), genres
            },
            update(cache, { data: { addBook }}) {
                const { allBooks: currentBooks } = cache.readQuery({ query: bookQuery.GET_ALL })

                if (currentBooks) {
                    cache.writeQuery({
                        query: bookQuery.GET_ALL,
                        data: {
                            allBooks: [
                                ...currentBooks,
                                addBook
                            ]
                        }
                    })
                }
            }
        }
)

    if (!show) return null
    if (loading) return <>Loading...</>
    if (error) return <>Error: { error.message }</>



    const submit = async (event) => {
        event.preventDefault()

        console.log('add book...')
        addBook()

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
        <form onSubmit={submit}>
            <div>
            title
            <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author
            <input
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            published
            <input
                type="number"
                value={published}
                onChange={({ target }) => setPublished(target.value)}
            />
            </div>
            <div>
            <input
                value={genre}
                onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
                add genre
            </button>
            </div>
            <div>genres: {genres.join(' ')}</div>
            <button type="submit">create book</button>
        </form>
        </div>
    )
}

export default NewBook