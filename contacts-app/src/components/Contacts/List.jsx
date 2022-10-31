import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { contactSelectors, deleteAllContact } from '../../redux/contactSlice'
import Item from './Item';


function List() {

    const contacts = useSelector(contactSelectors.selectAll);
    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        if (window.confirm("Delete all contacts")) {
            dispatch(deleteAllContact());
        }
    }


    return (<>
        {!(contacts.length <= 1) &&
            <div className='text-right'>
                <button className='ml-auto w-fit bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-2 border-red-700 hover:border-red-500 rounded'
                    onClick={() => { handleDeleteAll() }}
                >
                    Delete All
                </button>
            </div>
        }
        <ul className='my-4'>
            {
                contacts.map(contact => (
                    <Item key={contact.id} item={contact} />
                ))
            }
        </ul>
    </>
    )
}

export default List