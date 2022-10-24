import { createSlice, nanoid } from "@reduxjs/toolkit"

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [
            {
                id: "12435423",
                title: "What is Lorem Ipsum?",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                color: "#F4F9F9"
            },
            {
                id: "12321435",
                title: "Where does it come from?",
                content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                color: "#FCE38A"
            },
            {
                id: "562432e4",
                title: "Why do we use it?",
                content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
                color: "#FBACCC"
            }
        ],
        colors: [
            "#F4F9F9",
            "#96BB7C",
            "#FBACCC",
            "#F875AA",
            "#FCE38A",
            "#A685E2"
        ],
        filteredItems: [{}]
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
        },
        deleteNote: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;
        },
        searchNotes: (state, action) => {
            const keyword = action.payload;
            const filtered = state.items.filter((item) => (item.title.includes(keyword) || item.content.includes(keyword)));
            state.filteredItems = filtered;
        }
    }
});

export const { addNote, deleteNote, searchNotes } = notesSlice.actions;

export default notesSlice.reducer;
