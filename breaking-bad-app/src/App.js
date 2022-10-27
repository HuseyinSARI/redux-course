
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import Container from '@mui/material/Container';
import Detail from "./pages/Detail";
import banner from './img/banner.webp';

function App() {

  const error = useSelector(state => state.characters.error)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <Container maxWidth="lg" >
    
      <img
        className="w-full -ml-2 mt-4 "
        alt="banner"
        src={banner}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:char_id" element={<Detail />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </Container>
  );
}

export default App;
