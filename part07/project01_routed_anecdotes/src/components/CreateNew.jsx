/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AnecdotesContext, newAnecdote } from "../contexts/AnecdotesContext"

import { useState, useContext } from "react"


export default function CreateNew()
{
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const [ anecdotes, anecdotesDispatch ] = useContext(AnecdotesContext)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      anecdotesDispatch(newAnecdote(content, author, info))
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