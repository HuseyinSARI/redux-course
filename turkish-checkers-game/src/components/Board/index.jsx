import { useState } from 'react'
import { useSelector } from 'react-redux'
import Draggable, { DraggableCore } from 'react-draggable'
import Stone from '../Stone'

function Board() {
  const { board } = useSelector(state => state.board);
  const [setX, setSetX] = useState(0)


  return (
    <div
      className='border flex flex-wrap box-content'
      style={{ width: "640px", height: "640px" }}>
      {
        board.map((row, rowIndex) => {
          return (
            row.map((item, colIndex) => {
              if (item === 1)
                return (
                  <Stone
                    key={String(rowIndex) + String(colIndex)}
                    boardX={colIndex * 80}
                    boardY={rowIndex * 80}
                    item={item}
                  />
                )
            }))

        })
      }
    </div >

  )
}

export default Board