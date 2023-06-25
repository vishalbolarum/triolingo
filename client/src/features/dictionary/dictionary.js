import { createSlice } from "@reduxjs/toolkit"

export const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState: {},
    reducers: {
        load: (state, action) => {
            return action.payload
        }
    }
})

export const { load } = dictionarySlice.actions

export default dictionarySlice.reducer