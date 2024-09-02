import { createSlice } from "@reduxjs/toolkit"

const initialState = "This is a placeholder value for the notification"

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        changeNotification(state, action)
        {
            return action.payload
        }
    }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer