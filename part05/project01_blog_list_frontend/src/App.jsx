
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import blogService from './services/blogs'
import loginService from "./services/login"
import userService from "./services/users"

import { useState, useEffect } from 'react'

const App = () => {
    const [blogs, setBlogs] = useState([])
    // for token
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)
    const [name, setName] = useState(null)

    async function fetchBlogs()
    {
        const users = await userService.getAll()
        const currUser = users.find(us => us.username === username)
        setBlogs(currUser.blogs)
        setName(currUser.name)
    }

    useEffect(() => {
        console.log("fetch blogs")
        if (user) {
            fetchBlogs()
        }
    }, [username])

    async function attemptLogin(ev, username, password)
    {
        ev.preventDefault()
        const token = await loginService.login(username, password)
        console.log("TOKEN", token)
        setUser(token)
        if (token) {
            setUsername(username)
        }
    }

    if (null === user) {
        return (
            <LoginForm submitAction={attemptLogin}/>
        )
    }

    return (
        
        <div>
            <div>
            {name} is logged in
            </div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App