import authorQuery from "../queries/authors"

import { useMutation } from "@apollo/client"
import { useState } from "react"



export default function UpdateAuthor( {authors })
{

    const [author, setAuthor] = useState(authors[0])
    const [bornDate, setBornDate] = useState(author.born)

    const [updateAuthor] = useMutation(
        authorQuery.EDIT_BIRTH,
        {
            variables: { name: author.name, setBornTo: bornDate },
        }
    )

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <select
                value={author.name}
                onChange={ev => {
                    const name = ev.target.value
                    const selectedAuthor = authors.find(aut => aut.name === name)
                    setAuthor(selectedAuthor)
                    if (selectedAuthor.born) setBornDate(selectedAuthor.born)
                }}
            >
                { authors.map(({ name }) => {
                    return <option key={name} value={name}>{name}</option>
                })}
            </select>
            <label>
                born: 
                <input
                    type="number"
                    value={bornDate}
                    onChange={ev => setBornDate(parseInt(ev.target.value))}
                ></input>
            </label>
            <button
                type="button"
                onClick={ev => {
                    ev.preventDefault()
                    updateAuthor()
                }}
            >
                Update Author
            </button>
        </div>
    )
}