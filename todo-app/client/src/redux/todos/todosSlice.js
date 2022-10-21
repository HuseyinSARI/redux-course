import { createSlice , nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: "1",
                title: "Learn Japanese",
                isCompleted: false,
            },
            {
                id: "2",
                title: "Read Manga",
                isCompleted: true,
            }
        ],
        activeFilter: "all",
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: ({title}) => {
                return {
                    payload: {
                        id: nanoid(),
                        isCompleted: false,
                        title
                    }
                }
            }
        },
        toggle: (state, action) => {
            const { id } = action.payload;
            const item = state.items.find(item => item.id === id)
            item.isCompleted = !item.isCompleted;
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.isCompleted === false);
            state.items = filtered;
        }
    },
});

export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items;
    }

    return state.todos.items.filter((todo) =>
        state.todos.activeFilter === "active" ? todo.isCompleted === false : todo.isCompleted === true
    )
}


export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;