import { useState } from 'react'
import { useSelector } from 'react-redux'
import Draggable, { DraggableCore } from 'react-draggable'
import Stone from '../Stone'

function Board() {
  const { board } = useSelector(state => state.board);
  const [setX, setSetX] = useState(0)

  // const eventHandler = (e, data) => {
  //   // console.log('Event Type', e.type);
  //   // console.log({ e, data });
  //   console.log("data lastX", data.lastX / 80);
  //   setSetX(Math.round(data.lastX / 80) * 80)
  //   console.log("setX : ", setX);
  // }

  // let state = {
  //   activeDrags: 0,
  //   deltaPosition: {
  //     x: 0, y: 0
  //   },
  //   controlledPosition: {
  //     x: setX, y: 0
  //   }
  // };

  // const { deltaPosition, controlledPosition } = state;


  return (
    <div
      className='border flex flex-wrap box-content'
      style={{ width: "640px", height: "640px" }}>
      {
        board.map((row, rowIndex) => {
          return (
            row.map((item, colIndex) => {
              if (item === 1)
                return <Stone deltaX={colIndex * 80} deltaY={rowIndex * 80} item={item} />
            }))

        })
      }
    </div >

  )
}

export default Board