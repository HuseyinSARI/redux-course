/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react'

import Draggable, { DraggableCore } from 'react-draggable'
import { useSelector, useDispatch } from 'react-redux'
import { click, changeBoardLocation } from '../../redux/board/boardSlice'
function Stone({ x, y }) {

    const { board, stonesMovementAreas, forcedMoves } = useSelector(state => state.board);
    const dispatch = useDispatch();

    const item = board[y][x];

    const [state, setState] = useState({
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: 0, y: 0
        }
    });

    const [lastLocation, setLastLocation] = useState({
        x: x,
        y: y,
    })
    const [newLocation, setNewLocation] = useState({
        x: x,
        y: y,
    })


    const onStart = () => {
        dispatch(click({ lastLocation }))
    }

    const onStop = (e, data) => {
        const diffX = Math.round(data.lastX / 80)
        const diffY = Math.round(data.lastY / 80)

        let newLocation = {
            x: lastLocation.x + diffX,
            y: lastLocation.y + diffY
        }

        // console.log("diffX:", diffX, " diffY:", diffY);
        // console.log(lastLocation);
        // console.log(newLocation);

        if (newLocation.x >= 0 && newLocation.y >= 0 && newLocation.x <= 7 && newLocation.y <= 7) {
            if (forcedMoves.length > 0) {
                if (stonesMovementAreas[newLocation.y][newLocation.x] === 2) {
                    dispatch(changeBoardLocation({ lastLocation: lastLocation, newLocation: newLocation }))
                    setLastLocation(newLocation)
                    setState({
                        controlledPosition: {
                            x: diffX * 80,
                            y: diffY * 80
                        }
                    })
                } else {
                    setState({
                        controlledPosition: {
                            x: 0,
                            y: 0
                        }
                    })
                }
            } else {
                if (stonesMovementAreas[newLocation.y][newLocation.x] === 1) {
                    console.log("2-1-if true");
                    dispatch(changeBoardLocation({ lastLocation: lastLocation, newLocation: newLocation }))
                    setLastLocation(newLocation)
                    setState({
                        controlledPosition: {
                            x: diffX * 80,
                            y: diffY * 80
                        }
                    })
                } else {
                    setState({
                        controlledPosition: {
                            x: 0,
                            y: 0
                        }
                    })
                }
            }
        } else {
            setState({
                controlledPosition: {
                    x: 0,
                    y: 0
                }
            })
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
            <div className={` rounded-full w-20 h-20 border absolute z-40  flex justify-center ${item === 1 || item === 3 ? "bg-white text-black" : "bg-black text-white"} `}>
                X:{lastLocation.x}, Y:{lastLocation.y} <br /> type:{item}
            </div>

        </Draggable>
    )
}

export default Stone