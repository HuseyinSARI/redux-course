import React from 'react'

function Item({ item }) {
    return (
        <li className='bg-violet-200 px-2 py-1 rounded-md my-2 flex justify-between'>
            <span>{item.name}</span>
            <span>{item.phone_number}</span>
        </li>
    )
}

export default Item