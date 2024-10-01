
import { createContext } from "react"

const initialState = { loggedIn: false }

const tokenKey = "userToken"

function updateLoginState() {
    return state => ({ loggedIn: !!window.localStorage.getItem(tokenKey) })
}

function logout() {
    return state => {
        window.localStorage.removeItem(tokenKey)
        return { loggedIn: false }
    }
}

function login(token) {
    return state => {
        window.localStorage.setItem(tokenKey, token)
        return { loggedIn: !!token }
    }
}

export const LoginContext = createContext()

export const actions = {
    updateLoginState,
    logout,
    login
}

export default {
    context: LoginContext,
    initialState
}