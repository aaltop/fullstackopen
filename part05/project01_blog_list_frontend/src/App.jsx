
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import BlogAddForm from "./components/BlogAddForm"
import Notification from "./components/Notification"

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
    const [notification, setNotification] = useState({text: null, timeoutId: null, success: true})

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

    function _setNotification(text, success, timeout)
    {

        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId)
        }

        const emptyNotification = {
            text: null,
            timeoutId: null,
            success: true
        }
        setNotification(
            {
                text: text,
                success: success,
                timeoutId: setTimeout(() => setNotification(emptyNotification), timeout)
            }
        )
    }

    async function attemptLogin(ev, username, password)
    {
        ev.preventDefault()
        const token = await loginService.login(username, password)
        setUser(token)
        if (token) {
            window.localStorage.setItem("user", token)
            window.localStorage.setItem("username", username)
            setUsername(username)
        } else {
            _setNotification("Invalid username or password", false, 5000)
        }
    }

    async function AddBlog(ev, title, author, url)
    {
        ev.preventDefault()
        const blog = {title, author, url}
        try {
            const responseBlog = await blogService.addBlog(blog, user)
            console.log(responseBlog)
            setBlogs(blogs.concat(responseBlog))
            _setNotification(`Added new blog "${title}" from ${author}`, true, 5000)
            //true for success
            return true
        } catch (e) {
            if (e.name === "AxiosError" && e.response.status === 400) {
                _setNotification(e.response.data.error, false, 5000)
            }
            // false for failure
            return false
        }
    }

    if (null === user) {
        return (
            <>
                <Notification text={notification.text} success={notification.success}/>
                <LoginForm submitAction={attemptLogin}/>
            </>
        )
    }

    return (
        
        <div>
            <Notification text={notification.text} success={notification.success}/>
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