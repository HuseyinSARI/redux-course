import './App.css';

import { useSelector } from 'react-redux'
import Board from './components/Board';
import { test } from './redux/board/boardSlice'
import { useDispatch } from 'react-redux'
function App() {

  const { item, forcedMoves, board ,isStoneEaten ,turn, locationLastMovingStone,stonesMovementAreas} = useSelector(state => state.board)
  const dispatch = useDispatch()
  const handleClick = () => {
    console.log("forcedMoves: ", forcedMoves);
    // dispatch(test())
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-500 '>
      <button onClick={handleClick}>test</button>
      turn : {turn} , forced move : {}
      <Board />
    </div>
  );
}

export default App;
