import { addVote } from "../reducers/anecdoteReducer"

import { useDispatch, useSelector, shallowEqual } from "react-redux"



export default function AnecdoteList()
{
    // using shallowEqual because otherwise a new array is created each time
    // which does not compare correctly with the previous one,
    // forcing a re-render even if the new array is actually the same
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filteredAnecdotes = anecdotes.filter(anec => {
            return anec.content.toLowerCase().includes(filter.toLowerCase())
        })
        return filteredAnecdotes.toSorted( (a, b) => b.votes - a.votes )
    }, shallowEqual)
    const dispatch = useDispatch()

    function vote(id)
    {
        console.log("vote", id)
        dispatch(addVote(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}