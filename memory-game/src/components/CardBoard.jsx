import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addCards, updateCard, cardsSelectors } from '../redux/cardsSlice'
import Card from './Card';

function CardBoard() {

    const dispatch = useDispatch()
    const [firstClick, setFirstClick] = useState(false);
    const [secondClick, setSecondClick] = useState(false);

    const cards = useSelector(cardsSelectors.selectAll);



    const cardData = [
        {
            id: "a1",
            name: "cart1",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "a2",
            name: "cart1",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "b1",
            name: "cart2",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "b2",
            name: "cart2",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "c1",
            name: "cart3",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "c2",
            name: "cart3",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "d1",
            name: "cart4",
            isOpen: false,
            isMatch: false,
        },
        {
            id: "d2",
            name: "cart4",
            isOpen: false,
            isMatch: false,
        },
    ]

    useEffect(() => {
        dispatch(addCards(cardData))
    }, [])

    console.log(cards);


    const handleClick = (id) => {

        dispatch(updateCard({
            id: id,
            changes: {
                isOpen: true,
            }
        }))

    }

    return (
        <div>
            {
                cards.map(card => (
                    <Card key={card.id} id={card.id}/>
                ))
            }
        </div>
    )
}

export default CardBoard