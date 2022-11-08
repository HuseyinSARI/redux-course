import { useState } from 'react'
import { useSelector } from 'react-redux'
import Draggable, { DraggableCore } from 'react-draggable'
import Stone from '../Stone'

function Board() {
  const { board, stonesMovementAreas } = useSelector(state => state.board);
  const [setX, setSetX] = useState(0)


  return (
    <div
      className='border flex flex-wrap box-content relative '
      style={{ width: "640px", height: "640px" }}>
      {
        board.map((row, rowIndex) => {
          return (
            row.map((item, colIndex) => {
              if (item > 0)
                return (< >
                  <div className=' border w-20 h-20 flex justify-center items-center'>
                    {stonesMovementAreas[rowIndex][colIndex]}
                  </div>
                  <Stone
                    key={String(rowIndex) + String(colIndex)}
                    boardX={colIndex * 80}
                    boardY={rowIndex * 80}
                    item={item}
                  />
                </>)

              return (<div key={String(rowIndex) + String(colIndex)} className='border w-20 h-20 flex justify-center items-center'>
                 {stonesMovementAreas[rowIndex][colIndex]}
              </div>)

            }))

        })
      }
    </div >

  )
}

export default Board