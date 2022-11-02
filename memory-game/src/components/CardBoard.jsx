import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { } from '../redux/cardsSlice'
import Card from './Card';

import { openCard, compare, close } from '../redux/cardsSlice'


function CardBoard() {

    const dispatch = useDispatch()

    const { items, compareArea } = useSelector(state => state.cards);


    useEffect(() => {
        if (compareArea.length === 2) {
            setTimeout(() => {
                dispatch(compare())

            }, 1000);
        }
    }, [compareArea])



    return (
        <div className='' style={{display:"flex" , maxWidth:"1100px", flexFlow:"wrap"}}>
            {
                items.map(card => (
                    <Card key={card.id} card={card} />
                ))
            }
        </div>
    )
}

export default CardBoard