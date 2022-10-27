import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuotes = createAsyncThunk("quotes/fetchQuotes", async (str) => {    
    const res = await axios (`${process.env.REACT_APP_API_BASE_ENDPOINT}/quote?author=${str.replace(" ", "+")}`)
    return res.data;
})

export const quotesSlice = createSlice({
    name: "quotes",
    initialState: {
        items: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: {
        [fetchQuotes.pending] : (state,action)=> {
            state.status = "loading"
        },
        [fetchQuotes.fulfilled] : (state,action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        [fetchQuotes.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        }
    },
});

export default quotesSlice.reducer;

export const quotesSelector = state => state.quotes.items;
export const quotesStatusSelector = state => state.quotes.status;
export const quotesErrorSelector = state => state.quotes.error;
