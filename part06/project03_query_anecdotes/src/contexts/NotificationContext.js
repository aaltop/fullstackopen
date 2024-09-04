/* eslint-disable react/prop-types */
import { createContext } from "react"

const initialState = {
    message: "",
    timeoutId: null
}


const route = "notification/"

export function changeNotification(message, timeoutId)
{
    return {
        type: route+"change",
        payload: { message, timeoutId }
    }
}

export function resetNotification()
{
    return {
        type: route+"reset"
    }
}

function reducer(state, action)
{
    switch (action.type)
    {
        case route+"change":
        {
            clearTimeout(state.timeoutId)
            return action.payload
        }
        case route+"reset":
        {
            clearTimeout(state.timeoutId)
            return initialState
        }
        default: return state
    }
}

export const NotificationContext = createContext()

export default {
    context: NotificationContext,
    reducer,
    initialState
}