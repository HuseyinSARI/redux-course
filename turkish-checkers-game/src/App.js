import './App.css';

import { useSelector } from 'react-redux'
import Board from './components/Board';

function App() {

  const { item, forcedMove } = useSelector(state => state.board)
  const handleClick = () => {
    console.log(forcedMove);
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-500 '>
      <button onClick={handleClick}>test</button>
      <Board />
    </div>
  );
}

export default App;
