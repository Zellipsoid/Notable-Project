import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./main.css"
import { userContext as context } from './Components/UserContext'
import Register from './Components/Register';
import PhysicianAppointments from './Components/PhysicianAppointments/PhysicianAppointments';

function App() {
  const userContext = useContext(context);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {userContext?.id ? 
        <>
            <Route path='/appointments' element={<PhysicianAppointments />}></Route>
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
