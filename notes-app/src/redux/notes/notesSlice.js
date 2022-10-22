import { createSlice, nanoid } from "@reduxjs/toolkit"

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [
            {
                id: "1",
                title: "title1",
                content: "content1",
                color: "red"
            }, {
                id: "2",
                title: "title2",
                content: "content2",
                color: "green"
            }, {
                id: "3",
                title: "title3",
                content: "content3",
                color: "blue"
            },
        ]
    },
    reducers: {
        addNote: {
            reducer: (state, action) => {
                state.items.push(action.payload)
            },
            prepare: ({ title, content, color }) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        color,
                    }
                }
            }
        }
    }
});

export const {addNote} = notesSlice.actions;

export default notesSlice.reducer;
