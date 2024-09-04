import anecdoteService from "../services/anecdotes"

import { useMutation, useQueryClient } from "@tanstack/react-query"


const AnecdoteForm = () => {

    const queryClient = useQueryClient()

    const addAnecdoteMutation = useMutation({
        mutationFn: anecdote => anecdoteService.createNew(anecdote),
        onSuccess: (newAnecdote) => {
            const queryKey = ["anecdotes"]
            const anecdotes = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, anecdotes.concat(newAnecdote))
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        addAnecdoteMutation.mutate(content)
    }

    return (
        <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
            <input name='anecdote' />
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm
