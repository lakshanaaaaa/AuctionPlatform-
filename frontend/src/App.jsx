import React from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';

function App() {
    const location = useLocation()
    const hideNavbarOnRoutes = ['/login']
    const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </>
  );
}

export default App;
