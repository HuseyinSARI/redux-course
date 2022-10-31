import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"
import { addContact } from "../../redux/contactSlice"
// import { addContacts } from "../../redux/contactSlice"

function Form() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("")

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !number) return;

        // const names = name.split(",");
        // const data = names.map(name => ({id:nanoid(), name}))
        // dispatch(addContacts(data))

        dispatch(addContact({ id: nanoid(), name, phone_number: number }))
        setName("");
        setNumber("");

    }
    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input className=" p-2" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                <input className=" p-2" placeholder='Phone Number' value={number} onChange={e => setNumber(e.target.value)} />
                <button className='ml-auto w-fit bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 hover:border-blue-500 rounded' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Form