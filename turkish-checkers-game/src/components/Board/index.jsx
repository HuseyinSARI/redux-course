import { useState } from 'react'
import { useSelector } from 'react-redux'
import Draggable, { DraggableCore } from 'react-draggable'
import Stone from '../Stone'
import Square from '../Square'

function Board() {
  const { board, stonesMovementAreas, forcedMoves } = useSelector(state => state.board);
  const [setX, setSetX] = useState(0)

  // console.log("board",board);
  return (
    <div
      className='border flex flex-wrap box-content relative'
      style={{ width: "640px", height: "640px" }}>
      {
        board.map((row, rowIndex) => {
          return (
            row.map((item, colIndex) => {

              return (<Square
                y={rowIndex}
                x={colIndex}
              />)            
              
            }))

        })
      }
    </div >

  )
}

export default Board


// return (<>
//   <div className=' border w-20 h-20 flex justify-center items-center'>
//     {stonesMovementAreas[rowIndex][colIndex]}
//   </div>
//  {item > 0 && <Stone
//     key={String(rowIndex) + String(colIndex)}
//     boardX={colIndex * 80}
//     boardY={rowIndex * 80}
//     item={item}
//   />}
// </>)  



  // return (<Square
  //   y={rowIndex}
  //   x={colIndex}
  // />)
