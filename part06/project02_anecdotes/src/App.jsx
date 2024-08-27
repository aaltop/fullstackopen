import { addVote, addAnecdote } from "./reducers/anecdoteReducer"

import { useSelector, useDispatch } from "react-redux"

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log("vote", id)
        dispatch(addVote(id))
    }

    function newAnecdote(ev)
    {
        ev.preventDefault()
        const anecdote = ev.target.anecdote.value
        console.log("New anecdote", anecdote)
        dispatch(addAnecdote(anecdote))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
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
            <h2>create new</h2>
            <form onSubmit={ newAnecdote }>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App