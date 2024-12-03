import React from 'react';
import './App.css';
import HomePage from './pages/homePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from './pages/authPages/RegistrationPage';
import LoginPage from './pages/authPages/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
