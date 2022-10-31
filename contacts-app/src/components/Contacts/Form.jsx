import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"
import { addContact ,addContacts } from "../../redux/contactSlice"

function Form() {
    const [name, setName] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return ;

        const names = name.split(",");
        const data = names.map(name => ({id:nanoid(), name}))
        dispatch(addContacts(data))
        // dispatch(addContact({ id: nanoid(), name }))
        setName("");


    }
    return (
        <div>
            <h1>Contacts</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            </form>
        </div>
    )
}

export default Form