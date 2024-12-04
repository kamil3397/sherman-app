import React from 'react';
import './App.css';
import HomePage from './pages/homePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
