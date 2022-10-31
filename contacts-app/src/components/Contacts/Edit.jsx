import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { contactSelectors, updateContact } from '../../redux/contactSlice'
import { useEffect } from 'react';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const contact = useSelector(state => contactSelectors.selectById(state, id));
    const [name, setName] = useState(contact?.name);
    const [number, setNumber] = useState(contact?.phone_number)

    const tempName = name;
    const tempNumber = number;
    useEffect(() => {
        if (!contact) {
            navigate("/")
            console.log("yok");
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !number){
            alert("Name and number is required.");
            return;
        };

        dispatch(updateContact({
            id: contact.id,
            changes: {
                name,
                phone_number: number,
            }
        }))

        navigate("/");
    }
    const handleBack = () => {
        setName(tempName)
        setNumber(tempNumber)
        navigate("/")
    }

    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-3xl font-bold'>Edit</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input className=" p-2 rounded" placeholder='Name' value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input className=" p-2 rounded" placeholder='Phone Number' value={number}
                    onChange={e => setNumber(e.target.value)}
                />
                <div className=' flex justify-end gap-4   '>
                    <button
                        className=' w-fit bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 hover:border-blue-500 rounded'
                        type='submit'
                    >
                        Update
                    </button>
                    <button
                        className=' w-fit bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 hover:border-blue-500 rounded'
                        onClick={handleBack}
                    >
                        Back
                    </button></div>

            </form>

        </div>
    )
}

export default Edit