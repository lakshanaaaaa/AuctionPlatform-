import React from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';

function App() {
    const location = useLocation()
    const hideNavbarOnRoutes = ['/login','/signup']
    const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
         <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
