import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify';

function Info() {

    const { turn, forcedMoves } = useSelector(state => state.board)
    const [isForced, setIsForced] = useState(false)

    // useEffect(() => {

    //     if (forcedMoves.length > 0) {
    //         setIsForced(true)
    //         toast("force move exist");
    //     } else {
    //         setIsForced(false)
    //     }

    // }, [forcedMoves])

    const notify = () => toast("Wow so easy!");

    return (
        <div className='w-96 sm:w-640 m-8'>

            <button onClick={notify}>Notify!</button>

            Turn : {turn}
            {isForced && <span> forced move exist</span>}

        </div>
    )
}

export default Info