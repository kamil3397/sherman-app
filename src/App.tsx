import './App.css';
import HomePage from 'pages/Home/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from 'pages/Auth/Register';
import Login from 'pages/Auth/Login';
import { MainLayout } from 'layouts';
import { ToastContainer } from 'react-toastify';
import Calendar from 'pages/Training/Calendar';
//przerob import na lazy import

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/training' element={<Calendar />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
