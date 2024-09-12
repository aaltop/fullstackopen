// Local imports
// -----------------

import LoginForm from "./components/LoginForm"
import Menu from "./components/Menu"
import Notification from "./components/Notification"

import {
    NotificationContext,
    notifyWithTimeout,
} from "./contexts/NotificationContext"
import {
    UserContext,
    setUser,
} from "./contexts/UserContext"

import loginService from "./services/login"
import userService from "./services/users"

import { AppDiv } from "./style/div"

// =======================

import { useEffect, useContext } from "react"

const App = props => {
    const [notification, notificationDispatch] = useContext(
        NotificationContext
    )
    const [user, userDispatch] = useContext(UserContext)

    function logOut() {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        window.location.reload()
    }

    // get cached user info if possible
    useEffect(() => {
        const token = window.localStorage.getItem("token")
        const username =
            window.localStorage.getItem("username")
        userDispatch(setUser({ ...user, username, token }))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchUser() {
        try {
            const userData = await userService.getUser(
                user.username,
                user.token
            )
            userDispatch(
                setUser({ ...user, name: userData.name })
            )
        } catch (e) {
            if (
                e.response.status === 401 &&
                e.response.data.error.includes(
                    "Expired token"
                )
            ) {
                logOut()
            } else {
                throw e
            }
        }
    }

    // initialise
    useEffect(() => {
        if (user.token) {
            console.log("Fetch data")
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

    function _setNotification(text, success, timeoutMilli) {
        notifyWithTimeout(
            notificationDispatch,
            text,
            success,
            timeoutMilli
        )
    }

    async function attemptLogin(ev, username, password) {
        ev.preventDefault()
        const token = await loginService.login(
            username,
            password
        )
        if (token) {
            window.localStorage.setItem("token", token)
            window.localStorage.setItem(
                "username",
                username
            )
            userDispatch(
                setUser({ ...user, username, token })
            )
        } else {
            _setNotification(
                "Invalid username or password",
                false,
                5000
            )
        }
    }

    if (null === user.token) {
        return (
            <AppDiv>
                <Notification
                    text={notification.text}
                    success={notification.success}
                />
                <LoginForm submitAction={attemptLogin} />
            </AppDiv>
        )
    }

    return (
        <AppDiv>
            <Notification
                text={notification.text}
                success={notification.success}
            />
            <div>
                {user.name} is logged in
                <button type="button" onClick={logOut}>
                    Log Out
                </button>
            </div>
            <Menu />
            {props.children}
        </AppDiv>
    )
}

export default App
