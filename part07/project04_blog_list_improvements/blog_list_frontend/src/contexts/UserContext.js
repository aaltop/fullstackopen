import { createContext } from "react"

const initialState = {
    username: null,
    name: null,
    token: null
}
const route = "user/"

function reducer(state = initialState, action)
{
    switch (action.type)
    {
    case route+"set":
    {
        return action.payload
    }

    default: return state
    }
}


// Action creators
// ---------------

export function setUser({ username, name, token })
{
    return {
        type: route+"set",
        payload: {
            username,
            name,
            token
        }
    }
}

// ==================

export const UserContext = createContext()

export const UserContextProps = {
    context: UserContext,
    reducer,
    initialState
}