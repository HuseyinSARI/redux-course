import React from 'react'

import { useSelector, useDispatch } from "react-redux";

import { toggle , destroy } from "../redux/todos/todosSlice";

function TodoList() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.todos.items);

    const handleDestroy = (id) => {
        // emin misin ?
        if(window.confirm("Are you sure?")){
            dispatch(destroy(id));
        }
    }

    return (

        <ul className="todo-list">
            {items.map((item) => {
                return (
                    <li key={item.id} className={!item.isCompleted ? "" : "completed"}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                onChange={() => dispatch(toggle({ id: item.id }))}
                                checked={item.isCompleted}
                            />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id) }></button>
                        </div>
                    </li>
                )
            })}

        </ul>
    )
}

export default TodoList