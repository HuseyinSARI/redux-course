import './App.css';

import { useSelector } from 'react-redux'
import Board from './components/Board';
import { test } from './redux/board/boardSlice'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
function App() {

  const { item, forcedMoves, board, isStoneEaten, turn, locationLastMovingStone, stonesMovementAreas } = useSelector(state => state.board)
  const dispatch = useDispatch()

  const [isForced, setIsForced] = useState(false)

  useEffect(() => {
    if (forcedMoves.length>0) {
      setIsForced(true)
    } else {
      setIsForced(false)
    }
  }, [forcedMoves])


  const handleClick = () => {
    console.log("stonesMovementAreas: ", stonesMovementAreas);
    // dispatch(test())
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-500 '>
      <button onClick={handleClick}>test</button>
     <div>turn : {turn} ,  {isForced && <span>forced move exist</span>}  </div> 
      <Board />
    </div>
  );
}

export default App;
