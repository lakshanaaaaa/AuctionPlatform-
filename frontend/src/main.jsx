import React from 'react'
import { StrictMode } from 'react'
import './index.css'
import App from './App'
import Home from './Home'; 
import Login from './Login'
import Signup from './Signup';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
