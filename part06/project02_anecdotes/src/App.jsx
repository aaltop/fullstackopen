import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/FIlter"
import Notification from "./components/Notification"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

import { useEffect } from "react"
import { useDispatch } from "react-redux"

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])


    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <h2>create new</h2>
            <AnecdoteForm />
        </div>
    )
}

export default App