import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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