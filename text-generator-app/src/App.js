import './App.css';
import {useState} from 'react'
import { useSelector } from 'react-redux'
import Content from './components/Content';
import { Switch } from '@chakra-ui/react'


function App() {
const [theme, setTheme] = useState(true)

  return (
    <div className={theme ? "dark" : ""} >
      <div className='dark:bg-slate-700 dark:text-white min-h-screen p-5'>
        <Content theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App;
