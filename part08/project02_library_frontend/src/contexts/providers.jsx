import LoginContextProps from "./login"

import { useReducer } from "react"


function reducer(state, action) {
    if (!action) return state
    return action(state)
}

function createContext({ context, initialState }) {
    return function ContextProvider(props) {
        const [state, dispatch] = useReducer(reducer, initialState)

        return (
            <context.Provider value={[state, dispatch]}>
                {props.children}
            </context.Provider>
        )
    }
}


export const LoginContextProvider = createContext(LoginContextProps)