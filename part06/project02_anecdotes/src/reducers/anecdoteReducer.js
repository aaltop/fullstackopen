import anecdoteService from "../services/anecdotes"

import { createSlice } from "@reduxjs/toolkit"
const asObject = (anecdote) => {
    return {
        content: anecdote,
        votes: 0
    }
}

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        _addVote(state, action)
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
        _addAnecdote(state, action)
        {
            const anecdote = action.payload
            return state.concat(anecdote)
        },
        setAnecdotes(state, action)
        {
            return action.payload
        }
    }
})

const { _addAnecdote, _addVote } = anecdoteSlice.actions

export const { setAnecdotes } = anecdoteSlice.actions

export function initializeAnecdotes()
{
    return async (dispatch, getState) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export function addAnecdote(anecdote)
{
    return async (dispatch, getState) => {
        const responseAnecdote = await anecdoteService.createNew(asObject(anecdote))
        dispatch(_addAnecdote(responseAnecdote))
    }
}

export function addVote(id)
{
    return async (dispatch, getState) => {
        const newState = await anecdoteService.addVote(id)
        dispatch(_addVote(id))
    }
}

export default anecdoteSlice.reducer