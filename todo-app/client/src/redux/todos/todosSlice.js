import { createSlice } from "@reduxjs/toolkit";

import {
    getTodosAsync,
    addTodoAsync,
    toggleTodoAsync,
    removeTodoAsync,
    clearCompletedTodoAsync
} from "./services"

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem("activeFilter"),
        addNewTodo: {
            isLoading: false,
            error: null
        }
    },
    reducers: {
        // addTodo: {
        //     reducer: (state, action) => {
        //         state.items.push(action.payload);
        //     },
        //     prepare: ({title}) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 isCompleted: false,
        //                 title
        //             }
        //         }
        //     }
        // },
        // toggle: (state, action) => {
        //     const { id } = action.payload;
        //     const item = state.items.find(item => item.id === id)
        //     item.isCompleted = !item.isCompleted;
        // },
        // destroy: (state, action) => {
        //     const id = action.payload;
        //     const filtered = state.items.filter((item) => item.id !== id);
        //     state.items = filtered;
        // },
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
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodo.isLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.isLoading = false;
            state.addNewTodo.error = action.error.message;
        },
        // toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, isCompleted } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].isCompleted = isCompleted;
            console.log(action.payload);
        },
        [removeTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload;

            // first method 
            // const filtered = state.items.filter((item) => item.id !== id);
            // state.items = filtered;

            // second method same as toggle
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1);
        },
        [clearCompletedTodoAsync.fulfilled]: (state, action)=>{
            state.items = action.payload;            
        }


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


export const { destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;