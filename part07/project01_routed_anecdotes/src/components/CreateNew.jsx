import { AnecdotesContext, newAnecdote } from "../contexts/AnecdotesContext"
import { NotificationContext, notifyWithTimeout } from "../contexts/NotificationContext"
import { useField } from "../hooks"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function CreateNew()
{
    const content = useField()
    const author = useField()
    const info = useField()

    const [ anecdotes, anecdotesDispatch ] = useContext(AnecdotesContext)
    const [ notif, notifDispatch ] = useContext(NotificationContext)
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        anecdotesDispatch(newAnecdote(content.value, author.value, info.value))
        notifyWithTimeout(notifDispatch, `a new anecdote ${content.value} created!`, 5)
        navigate("/")
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
        </form>
      </div>
    )
  
}