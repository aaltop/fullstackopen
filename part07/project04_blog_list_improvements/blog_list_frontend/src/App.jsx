import LoginForm from "./components/LoginForm"
import BlogAddForm from "./components/BlogAddForm"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"

import { NotificationContext, notifyWithTimeout } from "./contexts/NotificationContext"
import { UserContext, setUser } from "./contexts/UserContext"

import blogService from "./services/blogs"
import loginService from "./services/login"
import userService from "./services/users"

import { useState, useEffect, useContext } from "react"

const App = () => {

    const [notification, notificationDispatch] = useContext(NotificationContext)
    const [user, userDispatch] = useContext(UserContext)

    function logOut()
    {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        window.location.reload()
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        const username = window.localStorage.getItem("username")
        userDispatch(setUser({ ...user, username, token }))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchUser()
    {
        try {
            const userData = await userService.getUser(user.username, user.token)
            userDispatch(setUser({ ...user, name: userData.name }))
        } catch (e) {
            if (e.response.status === 401 && e.response.data.error.includes("Expired token")) {
                logOut()
            } else {
                throw e
            }
        }
    }

    // initialise
    useEffect(() => {
        console.log("Fetch data")
        if (user.token) {
            fetchUser()
        }
    // sure react, I really should have fetchUser as dependency
    // as that will not be reached regardless unless user is truthy...
    // To be fair, though, I guess this is a little silly as if user
    // is set to any falsy value, it's not going to do anything, but the effect
    // will still run. Still, I want to initialise when opening the
    // the application, and I guess this is the way to do it?
    // could call the just the fetch functions themselves once logging
    // in and not have the dependency here, though.
    }, [user.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function _setNotification(text, success, timeoutMilli)
    {
        notifyWithTimeout(
            notificationDispatch,
            text,
            success,
            timeoutMilli
        )
    }

    async function attemptLogin(ev, username, password)
    {

        ev.preventDefault()
        const token = await loginService.login(username, password)
        if (token) {
            window.localStorage.setItem("token", token)
            window.localStorage.setItem("username", username)
            userDispatch(setUser({ ...user, username, token }))
        } else {
            _setNotification("Invalid username or password", false, 5000)
        }

    }

    function setBlogs(blogs)
    {
        _setBlogs(blogs.toSorted((x, y) => y.likes - x.likes))
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
        blogService.deleteBlog(blog, user.token)
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

    if (null === user.token) {
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
                {user.name} is logged in
                <button type="button" onClick={logOut}>Log Out</button>
            </div>
            <h2>Add new blog</h2>
            <BlogAddForm user={user.token}/>
            <h2>Blogs</h2>
            <BlogList username={user.username} />
        </div>
    )
}

export default App