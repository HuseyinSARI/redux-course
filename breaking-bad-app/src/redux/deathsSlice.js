import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeaths = createAsyncThunk("deaths/fetchDeaths", async (str) => {    
    const res = await axios (`${process.env.REACT_APP_API_BASE_ENDPOINT}/death?name=${str.replace(" ", "+")}`)
    return res.data;
})

export const deathsSlice = createSlice({
    name: "deaths",
    initialState: {
        items: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: {
        [fetchDeaths.pending] : (state,action)=> {
            state.status = "loading"
        },
        [fetchDeaths.fulfilled] : (state,action) => {
            state.status = "succeeded";
            state.items = action.payload;
        },
        [fetchDeaths.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        }
    },
});

export default deathsSlice.reducer;

export const deathsSelector = state => state.deaths.items[0];
export const deathsStatusSelector = state => state.deaths.status;
export const deathsErrorSelector = state => state.deaths.error;
