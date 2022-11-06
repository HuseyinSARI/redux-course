/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react'

import Draggable, { DraggableCore } from 'react-draggable'
import { useSelector, useDispatch } from 'react-redux'
import { click } from '../../redux/board/boardSlice'
function Stone({ boardX, boardY, item }) {

  const { board, stonesMovementAreas } = useSelector(state => state.board);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 3, y: 3
    },
    controlledPosition: {
      x: boardX, y: boardY
    }
  });

  const [lastLocation, setLastLocation] = useState({
    x: boardX / 80,
    y: boardY / 80,
  })

  let defaultMoveableSquares = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let moveableSquares = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // col = x
  // row = y
  console.log(stonesMovementAreas);
  moveableSquares = stonesMovementAreas;
  // moveableSquares = defaultMoveableSquares.map((row, rowIndex) => {
  //   return row.map((value, colIndex) => {
  //     // console.log("v:", value, " r:", rowIndex, "c:", colIndex)
  //     // if (rowIndex === 1 && colIndex === 1) {
  //     //   value = 1
  //     // }
  //     if (rowIndex >= lastLocation.y - 1 &&
  //       rowIndex <= lastLocation.y + 1 &&
  //       colIndex >= lastLocation.x - 1 &&
  //       colIndex <= lastLocation.x + 1) {
  //       value = 1
  //     }

  //     return value;
  //   })
  // });

  // console.log(moveableSquares);
  // console.log("deneme:", deneme);

  const onStart = () => {
    dispatch(click({ lastLocation }))
  }

  const onStop = (e, data) => {
    const snapX = Math.round(data.lastX / 80) * 80
    const snapY = Math.round(data.lastY / 80) * 80

    let location = {
      x: snapX / 80,
      y: snapY / 80
    }

    console.log("ll:", lastLocation, " l:", location);

    if (location.x >= 0 && location.y >= 0 && location.x <= 7 && location.y <= 7) {

      if (moveableSquares[location.y][location.x] === 1) {
        setLastLocation(location)
        setState({
          controlledPosition: {
            x: snapX, y: snapY
          }
        });
      } else {
        setState({
          controlledPosition: {
            x: lastLocation.x * 80, y: lastLocation.y * 80
          }
        });
      }

    } else {
      setState({
        controlledPosition: {
          x: lastLocation.x * 80, y: lastLocation.y * 80
        }
      });
    }

  };


  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setState({ controlledPosition: { x, y } });
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    onStop(e, position);
  };

  const { deltaPosition, controlledPosition } = state;


  return (
    <Draggable
      position={controlledPosition}
      onStart={onStart}
      onDrag={onControlledDrag}
      onStop={onControlledDragStop}
    >
      <div className='rounded-full w-20 h-20 border absolute'>
        <br />
        X:{lastLocation.x}, Y:{lastLocation.y} <br />
        {item}
      </div>

    </Draggable>
  )
}

export default Stone