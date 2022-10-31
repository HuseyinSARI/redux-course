import './App.css';
import Contacts from './components/Contacts';
import Edit from './components/Contacts/Edit'
import TradeMark from './components/Contacts/TradeMark'
import { Routes, Route, Outlet, Link } from "react-router-dom";


function App() {
  return (<>

    <div className='container mx-auto h-screen flex items-center justify-center flex-col' >
      <div className='min-w-[50%] px-4 py-10 bg-sky-300 rounded'>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
      <TradeMark />

    </div>
  </>
  );
}

export default App;
