
import { Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import Container from '@mui/material/Container';
import Detail from "./pages/Detail";


function App() {

  const error = useSelector(state => state.characters.error)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  return (
    <Container maxWidth="lg">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/detail/char_id">Detail</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>

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

function About() {
  return <h1>About</h1>
}
function Users() {
  return <h1>Users</h1>
}


export default App;
