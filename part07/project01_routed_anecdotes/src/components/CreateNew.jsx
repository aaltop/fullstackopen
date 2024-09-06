import { AnecdotesContext, newAnecdote } from "../contexts/AnecdotesContext"
import { NotificationContext, notifyWithTimeout } from "../contexts/NotificationContext"
import { useField } from "../hooks"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function CreateNew()
{
    // Wow, can't believe the rename works, didn't even look it up
    const { inputProps: content, reset: contentReset } = useField()
    const { inputProps: author, reset: authorReset } = useField()
    const { inputProps: info, reset: infoReset } = useField()

    const [ anecdotes, anecdotesDispatch ] = useContext(AnecdotesContext)
    const [ notif, notifDispatch ] = useContext(NotificationContext)
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        anecdotesDispatch(newAnecdote(content.value, author.value, info.value))
        notifyWithTimeout(notifDispatch, `a new anecdote ${content.value} created!`, 5)
        navigate("/")
    }

    function resetForm(e)
    {
        // doesn't seem to do anything anyways, but still
        e.preventDefault()
        contentReset()
        authorReset()
        infoReset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button type="reset" onClick={resetForm}>reset</button>
        </form>
      </div>
    )
  
}