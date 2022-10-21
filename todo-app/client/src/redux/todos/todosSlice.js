import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getTodosAsync = createAsyncThunk("todos/getTodosAsync",
    async () => {
        const res = await axios(process.env.REACT_APP_API_BASE_ENDPOINT + "/todos")
        return res.data;
    });

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const res = await axios.post(process.env.REACT_APP_API_BASE_ENDPOINT + "/todos", data);
    return res.data;
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: "all",
        addNewIsTodoLoading: false,
        addNewTodoError: null,
    },
    reducers: {
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
    extraReducers: {
        // get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        // add todos
        [addTodoAsync.pending] : (state, action) => {
            state.addNewTodoIsLoading = true;
        },
        [addTodoAsync.fulfilled] : (state, action) => {
            state.items.push(action.payload);
            state.addNewTodoIsLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodoIsLoading = false;
            state.addNewTodoError = action.error.message;
        },
        
    }
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


export const {toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;