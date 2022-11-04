import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchText = createAsyncThunk("text/getText", async ({paras,format}) => {
    // console.log("paras : ", paras);
    // console.log("format : ", format);
    const res = await axios(`https://baconipsum.com/api/?type=all-meat&paras=${paras}&format=${format}`)
    return res.data
})


export const textSlice = createSlice({
    name: "text",
    initialState: {
        item: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: {
        [fetchText.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchText.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.item = [action.payload]
        },
        [fetchText.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
})



export default textSlice.reducer;