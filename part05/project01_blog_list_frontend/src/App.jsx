import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogAddForm from "./components/BlogAddForm"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import loginService from "./services/login"
import userService from "./services/users"

import { useState, useEffect } from "react"

const App = () => {
    const [blogs, _setBlogs] = useState([])
    // for token
    const [user, setUser] = useState(window.localStorage.getItem("user"))
    const [username, setUsername] = useState(window.localStorage.getItem("username"))
    const [name, setName] = useState(null)
    const [notification, setNotification] = useState({ text: null, timeoutId: null, success: true })

    async function fetchUser()
    {
        try {
            const userData = await userService.getUser(username, user)
            setName(userData.name)
        } catch (e) {
            if (e.response.status === 401 && e.response.data.error.includes("Expired token")) {
                logOut()
            } else {
                throw e
            }
        }

    }

    async function fetchBlogs()
    {
        setBlogs(await blogService.getAll())
    }

    function logOut()
    {
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("username")
        window.location.reload()
    }



    // initialise
    useEffect(() => {
        console.log("Fetch data")
        if (user) {
            fetchUser()
            fetchBlogs()
        }
    // sure react, I really should have fetchUser as dependency
    // as that will not be reached regardless unless user is truthy...
    // To be fair, though, I guess this is a little silly as if user
    // is set to any falsy value, it's not going to do anything, but the effect
    // will still run. Still, I want to initialise when opening the
    // the application, and I guess this is the way to do it?
    // could call the just the fetch functions themselves once logging
    // in and not have the dependency here, though.
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

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

    function setBlogs(blogs)
    {
        _setBlogs(blogs.toSorted((x, y) => y.likes - x.likes))
    }

    async function AddBlog(ev, title, author, url)
    {
        ev.preventDefault()
        const blog = { title, author, url }
        try {
            const responseBlog = await blogService.addBlog(blog, user)
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

    /**
     * Update blog on client side.
     */
    function updateBlog(newBlog, blogIdx)
    {
        const newBlogs = [...blogs]
        newBlogs[blogIdx] = newBlog
        setBlogs(newBlogs)
    }

    /**
     * Delete blog on server and client.
     */
    function deleteBlog(blog, blogIdx)
    {
        if (!window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
            return false
        }
        blogService.deleteBlog(blog, user)
        const newBlogs = [...blogs]
        setBlogs(newBlogs.filter((_blog, index) => index !== blogIdx))
        _setNotification(`Deleted "${blog.title}" by ${blog.author}`, true, 5000)
        return true
    }

    async function addBlogLike(blog, blogIdx)
    {
        const newBlog = await blogService.addLikes(blog.id, blog.likes+1)
        updateBlog(newBlog, blogIdx)
    }

    const rootStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    if (null === user) {
        return (
            <div style={rootStyle}>
                <Notification text={notification.text} success={notification.success}/>
                <LoginForm submitAction={attemptLogin}/>
            </div>
        )
    }

    return (
        <div style={rootStyle}>
            <Notification text={notification.text} success={notification.success}/>
            <div>
                {name} is logged in
                <button type="button" onClick={logOut}>Log Out</button>
            </div>
            <h2>Add new blog</h2>
            <BlogAddForm submitAction={AddBlog}/>
            <h2>Blogs</h2>
            {blogs.map( (blog, blogIdx) =>
                <Blog
                    key={ blog.id }
                    blog={ blog }
                    clientUserData={{ username }}
                    deleteBlog={() => deleteBlog(blog, blogIdx)}
                    onLike={() => addBlogLike(blog, blogIdx)}
                />
            )}
        </div>
    )
}

export default App