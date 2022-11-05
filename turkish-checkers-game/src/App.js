import './App.css';

import { useSelector } from 'react-redux'
import Board from './redux/components/Board';

function App() {

  const { item } = useSelector(state => state.board)

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-500 '>
      <Board />
    </div>
  );
}

export default App;
