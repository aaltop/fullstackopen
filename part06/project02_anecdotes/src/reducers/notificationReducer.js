import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: "",
    timeoutId: null
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        _changeNotification: {
            reducer: (state, action) => {
                const { message, timeoutId } = action.payload
                clearTimeout(state.timeoutId)
                return {
                    message,
                    timeoutId
                }
            },
            prepare: (message, timeoutId) => {
                return { payload: { message, timeoutId } }
            }
        },
        resetNotification(state, action)
        {
            return initialState
        }
    }
})

const { _changeNotification } = notificationSlice.actions

export const { resetNotification } = notificationSlice.actions

export function changeNotification(message, timeout)
{
    return async (dispatch, getState) => {
        const timeoutMilli = timeout*1000
        const timeoutId = setTimeout(() => dispatch(resetNotification()), timeoutMilli)
        dispatch(_changeNotification(message, timeoutId))
    }
}


export default notificationSlice.reducer