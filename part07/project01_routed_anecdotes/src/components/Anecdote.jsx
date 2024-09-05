import { AnecdotesContext } from "../contexts/AnecdotesContext"

import { useContext } from "react"
import { useLoaderData } from "react-router-dom"

export default function Anecdote()
{

    const { id } = useLoaderData()

    const [ anecdotes ] = useContext(AnecdotesContext)
    const anecdote = anecdotes.find(anec => anec.id === id)

    if (!anecdote) return null

    const { author, content, info, votes } = anecdote

    return (
        <div style={{paddingBlock: 10}}>
            <h2>{`${content} by ${author}`}</h2>
            <div>
                has {votes} votes
            </div>
            <div>
                For more info, see <a href={info}>{info}</a>
            </div>
        </div>
    )

}