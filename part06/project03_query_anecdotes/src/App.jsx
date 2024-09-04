import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from "./services/anecdotes"
import { NotificationContext, notifyWithTimeout } from './contexts/NotificationContext'

import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { useContext } from 'react'

const App = () => {

    const [ _notifState, notifDispatch ] = useContext(NotificationContext)

    const queryClient = useQueryClient()

    const addVoteMutation = useMutation({
        mutationFn: anecdote => anecdoteService.addVote(anecdote),
        onSuccess: newState => {
            const queryKey = ["anecdotes"]
            const anecdotes = queryClient.getQueryData(queryKey)
            const updatedAnecdotes = anecdotes.map(anec => {
                return (anec.id !== newState.id) 
                    ? anec
                    : newState
            })
            queryClient.setQueryData(queryKey, updatedAnecdotes)
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote')
        addVoteMutation.mutate(anecdote)
        notifyWithTimeout(notifDispatch, `Voted "${anecdote.content}"`)
    }

    const anecdotesQuery = useQuery({
        queryKey: ["anecdotes"],
        queryFn: anecdoteService.getAll,
        refetchOnWindowFocus: false
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
