import { useState, useEffect } from 'react'

import Draggable, { DraggableCore } from 'react-draggable'
import { useSelector } from 'react-redux'

function Stone({ boardX, boardY, item }) {

  const { board } = useSelector(state => state.board);

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


  const moveableSquares = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]


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
      onDrag={onControlledDrag}
      onStop={onControlledDragStop}
    >
      <div className='rounded-full w-20 h-20 border absolute'>
        X:{boardX}, Y:{boardY} <br />
        {item}
      </div>

    </Draggable>
  )
}

export default Stone