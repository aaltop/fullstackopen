import anecdoteService from "../services/anecdotes"

import { createSlice } from "@reduxjs/toolkit"
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        addVote(state, action)
        {
            const id = action.payload
            return state.map(anecdote => {
                if (anecdote.id !== id) return anecdote
                return {
                    ...anecdote,
                    votes: anecdote.votes + 1
                }
            })
        },
        addAnecdote(state, action)
        {
            const anecdote = action.payload
            return state.concat(asObject(anecdote))
        },
        setAnecdotes(state, action)
        {
            return action.payload
        }
    }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export function initializeAnecdotes()
{
    return async (dispatch, getState) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export default anecdoteSlice.reducer