import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openCard, compare, close } from '../redux/cardsSlice'
import "./Card.css"


function Card({ card }) {
    const dispatch = useDispatch()
    const { items, compareArea } = useSelector(state => state.cards);


    const handleClick = () => {
        dispatch(openCard({ id: card.id }))
        console.log(card.isMatch);
    }


    return (
        <div className="relative w-48" onClick={handleClick}>
            <img
                className={`absolute transition-all ease-in duration-200 
                            ${card.isOpen ? "rotate-y-0 delay-200" : " rotate-y-90 "}
                            `}
                src={card.src}
                alt={card.name}
            />
            <img
                className={`transition-all ease-in duration-200 ${card.isOpen ? "rotate-y-90 " : " rotate-y-0 delay-200"}`}
                src="https://www.freeiconspng.com/uploads/pokeball-transparent-png-2.png"
                alt="cover"
            />
        </div>


    )
}

export default Card