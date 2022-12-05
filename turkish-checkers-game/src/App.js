import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Info from './components/Info';
import Board from './components/Board';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const { item, forcedMoves, board, isStoneEaten, turn, locationLastMovingStone, stonesMovementAreas } = useSelector(state => state.board)
  const dispatch = useDispatch()

  const [isForced, setIsForced] = useState(false)

  useEffect(() => {
    if (forcedMoves.length > 0) {
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
    <div className='min-h-screen w-full m-auto  bg-slate-300 '>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className='container min-h-screen mx-auto w-96 sm:w-full flex  flex-col items-center  bg-slate-500'>
        <Info />
        <Board />

      </div>
    </div>

  );
}

export default App;
