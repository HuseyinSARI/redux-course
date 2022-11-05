import {configureStore} from '@reduxjs/toolkit'
import boardReducer from '../redux/board/boardSlice'

export const store = configureStore({
    reducer:{
        board: boardReducer,
    }
})