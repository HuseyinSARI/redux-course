import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: "1",
                title: "Learn Japanese",
                isCompleted : false,
            },
            {
                id :"2",
                title : "Read Manga",
                isCompleted : true,
            }
        ],
    },
    reducers: {},
});

export default todosSlice.reducer;