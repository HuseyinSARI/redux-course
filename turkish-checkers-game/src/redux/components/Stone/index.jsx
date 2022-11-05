import { useState } from 'react'

import Draggable, { DraggableCore } from 'react-draggable'


function Stone({ deltaX, deltaY, item }) {

  const [stateX, setStateX] = useState(0)
  const [stateY, setStateY] = useState(0)
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: deltaX, y: deltaY
    },
    controlledPosition: {
      x: 0, y: 0
    }
  });

  const eventHandler = (e, data) => {
    // console.log('Event Type', e.type);
    // console.log({ e, data });

    // const snapX = Math.round(data.lastX / 80) * 80
    // const snapY = Math.round(data.lastY / 80) * 80

    // setState({
    //   ...state,
    //   controlledPosition: {
    //     x: snapX, y: snapY
    //   }
    // });
  }


  const handleDrag = (e, ui) => {
    const { x, y } = state.deltaPosition;
    setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };
  const onStart = () => {
    // setState({ activeDrags: ++state.activeDrags });
  };

  const onStop = (e, data) => {
    console.log('Event Type', e.type);
    console.log({ e, data });
    // setState({ activeDrags: --state.activeDrags });
    const snapX = Math.round(data.lastX / 80) * 80
    const snapY = Math.round(data.lastY / 80) * 80

    setState({
      ...state,
      controlledPosition: {
        x: snapX, y: snapY
      }
    });
  };



  const dragHandlers = { onStart: onStart, onStop: onStop };
  const { deltaPosition, controlledPosition } = state;

  return (
    <Draggable
      {...dragHandlers}
      // onDrag={eventHandler}
      onStop={onStop}
      // position={controlledPosition}
      defaultPosition={{ x: deltaX, y: deltaY }}
    >
      <div className='rounded-full w-20 h-20 border absolute'>
        X:{deltaX}, Y:{deltaY} <br />
        {item}
      </div>
    </Draggable>
  )
}

export default Stone