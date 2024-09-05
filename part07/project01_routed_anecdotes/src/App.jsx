/* eslint-disable react/prop-types */
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import Footer from './components/Footer'
import About from './components/About'
import CreateNew from './components/CreateNew'


import { useState } from 'react'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"

function Layout(props)
{
    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            {props.children}
            <Footer />
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <AnecdoteList />
            </Layout>
        )
    },
    {
        path: "/about",
        element: (
            <Layout>
                <About />
            </Layout>
        )
    },
    {
        path: "/create",
        element: (
            <Layout>
                <CreateNew />
            </Layout>
        )
    }
])

function App()
{
    return <RouterProvider router={router} />
}

const Root = () => {

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
    </div>
  )
}

export default App
