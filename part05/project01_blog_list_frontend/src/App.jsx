
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import BlogAddForm from "./components/BlogAddForm"

import blogService from './services/blogs'
import loginService from "./services/login"
import userService from "./services/users"

import { useState, useEffect } from 'react'

const App = () => {
    const [blogs, setBlogs] = useState([])
    // for token
    const [user, setUser] = useState(window.localStorage.getItem("user"))
    const [username, setUsername] = useState(window.localStorage.getItem("username"))
    const [name, setName] = useState(null)

    async function fetchUser()
    {
        const userData = await userService.getUser(username, user)
        setBlogs(userData.blogs)
        setName(userData.name)
    }

    function logOut()
    {
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("username")
        window.location.reload()
    }



    useEffect(() => {
        console.log("fetch user data")
        if (user) {
            fetchUser()
        }
    }, [user])

    async function attemptLogin(ev, username, password)
    {
        ev.preventDefault()
        const token = await loginService.login(username, password)
        setUser(token)
        if (token) {
            window.localStorage.setItem("user", token)
            window.localStorage.setItem("username", username)
            setUsername(username)
        }
    }

    async function AddBlog(ev, title, author, url)
    {
        ev.preventDefault()
        const blog = {title, author, url}
        const responseBlog = await blogService.addBlog(blog, user)
        console.log(responseBlog)
        setBlogs(blogs.concat(responseBlog))
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
            <button type="button" onClick={logOut}>Log Out</button>
            </div>
            <h2>Add new blog</h2>
                <BlogAddForm submitAction={AddBlog}/>
            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App