import { createContext } from "react"


const initialState = { text: null, timeoutId: null, success: true }
const route = "notification/"


function reducer(state = initialState, action)
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
    default:
        return state
    }
}

// Action creators
// -----------------

export function changeNotification(text, timeoutId, success = true)
{
    return {
        type: route+"change",
        payload: {
            text,
            timeoutId,
            success
        }

    }
}

export function resetNotification()
{
    return {
        type: route+"reset"
    }
}

// ====================

export function notifyWithTimeout(dispatch, text, success = true, timeoutSecs = 5)
{
    const timeout = timeoutSecs*1000
    const timeoutId = setTimeout(() => dispatch(resetNotification), timeout)
    dispatch(changeNotification(text, timeoutId, success))
}

export const NotificationContext = createContext()

export const NotificationContextProps = {
    context: NotificationContext,
    reducer,
    initialState
}