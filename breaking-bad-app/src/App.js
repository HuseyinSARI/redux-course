
import { Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const error = useSelector(state => state.characters.error)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">about</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
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
    </>

  );
}

function About() {
  return <h1>About</h1>
}
function Users() {
  return <h1>Users</h1>
}


export default App;
