import { useEffect } from 'react'
import Loading from './Loading';
import Error from './Error';
import { useSelector, useDispatch } from "react-redux";
import {
    getTodosAsync,
    toggleTodoAsync,
    removeTodoAsync
} from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice"


function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const isLoading = useSelector(state => state.todos.isLoading);
    const error = useSelector(state => state.todos.error)

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    const handleToggle = async (id, isCompleted) => {
        await dispatch(toggleTodoAsync({ id, data: { isCompleted } }))
    }

    const handleDestroy = async (id) => {

        if (window.confirm("Are you sure?")) {
            await dispatch(removeTodoAsync(id));
        }
    };

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error} />
    }

    return (

        <ul className="todo-list">
            {filteredTodos.map((item) => {
                return (
                    <li key={item.id} className={!item.isCompleted ? "" : "completed"}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                onChange={() => handleToggle(item.id, !item.isCompleted)}
                                checked={item.isCompleted}
                            />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                        </div>
                    </li>
                )
            })}

        </ul>
    )
}

export default TodoList