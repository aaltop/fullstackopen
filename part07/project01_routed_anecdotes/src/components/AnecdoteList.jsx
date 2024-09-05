/* eslint-disable react/prop-types */
import { AnecdotesContext } from "../contexts/AnecdotesContext"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"



export default function AnecdoteList() 
{
    const [ anecdotes ] = useContext(AnecdotesContext)

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(({ id, content }) => {
                    return <li
                        key={id}
                    >
                        <Link to={`/anecdotes/${id}`}>{content}</Link>
                    </li>
                })}
            </ul>
        </div>
    )
}
