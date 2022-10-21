import {useEffect} from 'react'
import Loading from './Loading';
import Error from './Error';
import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy, selectFilteredTodos, getTodosAsync } from "../redux/todos/todosSlice";


function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const isLoading = useSelector(state => state.todos.isLoading);  
    const error = useSelector(state => state.todos.error)

    useEffect(()=> {
        dispatch(getTodosAsync())
    },[dispatch])

    const handleDestroy = (id) => {

        if (window.confirm("Are you sure?")) {
            dispatch(destroy(id));
        }
    };

    if(isLoading){
        return <Loading/>
    }

    if(error){
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
                                onChange={() => dispatch(toggle({ id: item.id }))}
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