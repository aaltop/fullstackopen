import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: "",
    timeoutId: null
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        changeNotification: {
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

export const { changeNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer