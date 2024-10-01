
import { createContext } from "react"

const initialState = { loggedIn: false }

function isLoggedIn() {
    return state => ({ loggedIn: !!window.localStorage.userToken })
}

export const LoginContext = createContext()

export const actions = {
    isLoggedIn
}

export default {
    context: LoginContext,
    initialState
}