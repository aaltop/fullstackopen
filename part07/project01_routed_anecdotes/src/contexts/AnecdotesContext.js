/* eslint-disable react/prop-types */
import { createContext } from "react"

const initialState = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: "1"
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: "2"
    }
]

function getId()
{
    return Math.floor(Math.random()*1000000).toString()
}

const route = "anecdotes/"

export function newAnecdote(content, author, info)
{
    return {
        type: route+"add",
        payload: { content, author, info }
    }
}

function reducer(state, action)
{
    switch (action.type)
    {
        case route+"add":
        {
            const { content, author, info } = action.payload
            const data = {
                content,
                author,
                info,
                votes: 0,
                id: getId()
            }
            return state.concat(data)
        }
        default: return state
    }
}

export const AnecdotesContext = createContext()

export default {
    context: AnecdotesContext,
    reducer,
    initialState
}