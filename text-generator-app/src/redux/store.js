import {configureStore} from '@reduxjs/toolkit'

import textReducer from './textSlice'

export const store = configureStore({
    reducer:{
        text: textReducer,
    }
})