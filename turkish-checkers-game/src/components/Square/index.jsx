import React from 'react'
import Stone from '../NewStone'
import { useDispatch, useSelector } from 'react-redux'

import Draggable, { DraggableCore } from 'react-draggable'

function Square({ x, y }) {
    const { board, stonesMovementAreas, forcedMoves } = useSelector(state => state.board)


    let isSquaredForced = false
    forcedMoves.map(fm => {
        if (fm.x === x && fm.y === y) {
            isSquaredForced = true;
        }
    })

    return (
        <div className='border border-solid w-12 h-12 sm:w-20 sm:h-20 border-white relative flex justify-center items-center'>

            {stonesMovementAreas[y][x] === 1 && <div className='absolute w-full h-full bg-green-500 '></div>}

            {stonesMovementAreas[y][x] === 2 && <div className='absolute w-full h-full bg-red-300 '></div>}

            {isSquaredForced && <div className='absolute w-full h-full  bg-red-500 '></div>}

            {board[y][x] > 0 &&
                <Stone
                    x={x}
                    y={y}
                />
            }

        </div>
    )
}

export default Square

// {board[y][x] > 0  &&
//     <Stone
//         boardX={x*80}
//         boardY={y*80}
//     />
// }