import { addVote, addAnecdote } from "./reducers/anecdoteReducer"

import AnecdoteForm from "./components/AnecdoteForm"

import { useSelector, useDispatch, shallowEqual } from "react-redux"

const App = () => {
    // using shallowEqual because otherwise a new array is created each time
    // which does not compare correctly with the previous one,
    // forcing a re-render even if the new array is actually the same
    const anecdotes = useSelector(state => state.toSorted( (a, b) => b.votes - a.votes ), shallowEqual)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log("vote", id)
        dispatch(addVote(id))
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
            <AnecdoteForm />
        </div>
    )
}

export default App