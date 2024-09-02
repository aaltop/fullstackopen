import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeFilter: {
            reducer: (state, action) => {
                return action.payload.filter
            },
            prepare: filter => {
                return { payload: { filter } }
            }
        }
    }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer