/* eslint-disable react/prop-types */
import { AnecdotesContext } from "../contexts/AnecdotesContext"

import { useState, useContext } from "react"



export default function AnecdoteList() 
{
    const [ anecdotes ] = useContext(AnecdotesContext)

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
            </ul>
        </div>
    )
}
