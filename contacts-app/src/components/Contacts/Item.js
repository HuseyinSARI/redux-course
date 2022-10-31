import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contactSlice'
import { MdOutlineDeleteForever, MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

function Item({ item }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteContact(id))
        }
    }
    return (
        <li className='bg-rose-300 px-2 py-1 rounded-md my-2 flex justify-between'>
            <span>{item.name}</span>
            <span className='mr-3'>{item.phone_number}</span>

            <div>
                <button className="ml-auto mr-2 w-fit bg-sky-500 hover:bg-sky-400 text-white font-bold py-1 px-2 border-b-2 border-sky-700 hover:border-sky-500 rounded-full"
                    onClick={() => { navigate(`/edit/${item.id}`) }}
                >
                    <MdModeEdit />
                    <span></span>
                </button>
                <button className="ml-auto w-fit bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-2 border-red-700 hover:border-red-500 rounded-full"
                    onClick={() => { handleDelete(item.id) }}
                >
                    <MdOutlineDeleteForever />
                    <span></span>
                </button>
            </div>

        </li>
    )
}

export default Item