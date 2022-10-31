import React from 'react'
import Form from './Form'
import List from './List'
import { useSelector } from 'react-redux'
import { contactSelectors } from '../../redux/contactSlice'

function Contacts() {

    const total = useSelector(contactSelectors.selectTotal);

    return (
        <div className=' '>
            <h1 className='text-3xl font-bold pb-3 '>Contacts ({total})</h1>
            <List />
            <Form />
        </div>
    )
}

export default Contacts