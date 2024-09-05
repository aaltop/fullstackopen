/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AnecdotesContext, newAnecdote } from "../contexts/AnecdotesContext"
import { NotificationContext, notifyWithTimeout } from "../contexts/NotificationContext"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function CreateNew()
{
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const [ anecdotes, anecdotesDispatch ] = useContext(AnecdotesContext)
    const [ notif, notifDispatch ] = useContext(NotificationContext)
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        anecdotesDispatch(newAnecdote(content, author, info))
        notifyWithTimeout(notifDispatch, `a new anecdote ${content} created!`, 5)
        navigate("/")
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url for more info
            <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  
}