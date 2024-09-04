import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from "./services/anecdotes"

import { useQuery, useMutation } from '@tanstack/react-query'

const App = () => {

    const handleVote = (anecdote) => {
        console.log('vote')
    }

    const anecdotesQuery = useQuery({
        queryKey: ["anecdotes"],
        queryFn: anecdoteService.getAll
    })

    if (anecdotesQuery.isPending)
    {
        return <>Loading...</>
    }
    else if (anecdotesQuery.isError)
    {
        return <>Anecdote service not available due to server problem</>
    }

    const anecdotes = anecdotesQuery.data

    return (
        <div>
        <h3>Anecdote app</h3>
        
        <Notification />
        <AnecdoteForm />
        
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default App
