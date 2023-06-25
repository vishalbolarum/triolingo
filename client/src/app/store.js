import { configureStore } from '@reduxjs/toolkit'
import dictionaryReducer from '../features/dictionary/dictionary'

export default configureStore({
    reducer: {
        dictionary: dictionaryReducer
    }
})