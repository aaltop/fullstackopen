/* eslint-disable react/prop-types */
import { useState } from "react"



export default function AnecdoteList() 
{
    const [anecdotes, setAnecdotes] = useState([
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: 1
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: 2
        }
    ])

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
            </ul>
        </div>
    )
}
