import { addAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification, resetNotification } from "../reducers/notificationReducer"

import { useDispatch } from "react-redux"


export default function AnecdoteForm({ onSubmit })
{
    const dispatch = useDispatch()

    function newAnecdote(ev)
    {
        ev.preventDefault()
        const anecdote = ev.target.anecdote.value
        console.log("New anecdote", anecdote)
        dispatch(addAnecdote(anecdote))

        // should probably put this timed notification code somewhere global
        const timeoutId = setTimeout(() => dispatch(resetNotification()), 5000)
        dispatch(changeNotification(`New anecdote: "${anecdote}"`, timeoutId))
    }

    // Don't know if it's a recommended thing to do,
    // but using the nullish colalescing allows the parent
    // to define functionality instead, but still the component
    // defines a default. This means less writing when the default
    // suffices, but allows for better reusability in case functionality
    // needs to be different between two different cases.
    //
    // Whether "AnecdoteForm" would really be reused is another thing.
    // Might be better to just have smaller custom components anyway,
    // and just compose further stuff from those, as is the OOP way. I mean, it's not
    // like this whole component is that much stuff anyway.
    return (
        <form onSubmit={ onSubmit ?? newAnecdote }>
            <div><input name="anecdote"/></div>
            <button>create</button>
        </form>
    )
}