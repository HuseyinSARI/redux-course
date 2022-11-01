import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addCards, updateCard, updateCards, cardsSelectors } from '../redux/cardsSlice'


function Card({ id }) {
    const dispatch = useDispatch()

    const allCards = useSelector(cardsSelectors.selectAll);
    const card = useSelector(state => cardsSelectors.selectById(state, id));
    const card_bro = allCards.find((item) => item.name === card.name && item.id !== card.id);

    const isAnyOneOpen = allCards.find((item) => item.isOpen === true && item.id !== card.id && item.isMatch !== true) 
    const notMatches = allCards.map((item) => {
        if(item.isMatch === false) return item;
    })


    const handleClick = () => {

        dispatch(updateCard({
            id: card.id,
            changes: {
                isOpen: true,
            }
        }))

        if (isAnyOneOpen) {
            if (card_bro.isOpen) {
                dispatch(updateCard({
                    id: card_bro.id,
                    changes: {
                        isMatch: true,
                    }
                }))
                dispatch(updateCard({
                    id: card.id,
                    changes: {
                        isMatch: true,
                    }
                }))
            } else {
                setTimeout(() => {
                   notMatches.map((item=> (
                        dispatch(updateCard({
                            id:item?.id,
                            changes: {
                                isOpen: false,
                            }
                        }))
                   )))                                      
                }, 1000)
            }
        }

    }

    useEffect(() => {


    }, [card])



    return (
        <button
            style={{backgroundColor:card.isMatch ? "red" :"" , color: card.isOpen ? "green" : "" , }}
            onClick={handleClick}
        >{card.name}</button>
    )
}

export default Card