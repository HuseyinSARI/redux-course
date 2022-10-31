import React from 'react'

import { useSelector } from 'react-redux'
import { contactSelectors } from '../../redux/contactSlice'
import Item from './Item';


function List() {

    const contacts = useSelector(contactSelectors.selectAll);

    console.log(contacts);
    return (
        <ul className='my-4'>
            {
                contacts.map(contact => (
                    <Item key={contact.id} item={contact} />
                ))
            }
        </ul>
    )
}

export default List