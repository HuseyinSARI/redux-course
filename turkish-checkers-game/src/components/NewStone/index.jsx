/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react'

import Draggable, { DraggableCore } from 'react-draggable'
import { useSelector, useDispatch } from 'react-redux'
import { click, changeBoardLocation } from '../../redux/board/boardSlice'

import { GiCrownedSkull } from 'react-icons/gi';
import { toast } from 'react-toastify';

function Stone({ x, y }) {

    const { board, stonesMovementAreas, forcedMoves, turn } = useSelector(state => state.board);
    const dispatch = useDispatch();

    const item = board[y][x];

    let stoneColor;
    if(item === 1 || item === 3){
        stoneColor = "white"
    }else{
        stoneColor = "black"
    }
    

    const [customStyle, setCustomStyle] = useState({
        zIndex: 10,
        cursor: "grab"
    })
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
                    toast.error("Forced Move Exist")
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
        setCustomStyle({ ...customStyle, zIndex: 999 })
    };

    const onControlledDragStop = (e, position) => {
        onControlledDrag(e, position);
        onStop(e, position);
        setCustomStyle({ ...customStyle, zIndex: 0 })
    };

    const { deltaPosition, controlledPosition } = state;


    return (
        <Draggable
            position={controlledPosition}
            onStart={onStart}
            onDrag={onControlledDrag}
            onStop={onControlledDragStop}
        >
            <div
                style={customStyle}
                color={"pink"}
                className={`rounded-full w-10 h-10 sm:w-14 sm:h-14 border absolute z-40  flex items-center justify-center ${item === 1 || item === 3 ? "bg-whiteStoneBackground" : "bg-blackStoneBackground"} `}
            >
                {/* X:{lastLocation.x}, Y:{lastLocation.y} <br /> type:{item} */}
                {item === 3 && <GiCrownedSkull size={30} color="#42032C" />}
                {item === 4 && <GiCrownedSkull size={30} color="#FFE15D" />}
            </div>

        </Draggable>
    )
}

export default Stone