import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./main.css"
import { userContext as context } from './Components/UserContext'
import Register from './Components/Register';

function App() {
  const userContext = useContext(context);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {userContext?.id ? 
        <>
            {/* routes for logged-in users here */}
        </> : 
        <>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
