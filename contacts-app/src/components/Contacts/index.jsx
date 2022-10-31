import React from 'react'
import Form from './Form'
import List from './List'

function Contacts() {
    return (
        <div className='min-w-[50%] px-4 py-10 bg-[#f0f8ff] '>
            <h1 className='text-3xl font-bold pb-3 '>Contacts</h1>

            <List />
            <Form />
        </div>
    )
}

export default Contacts