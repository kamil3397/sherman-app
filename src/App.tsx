import './App.css';
import HomePage from 'pages/Home/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from 'pages/Auth/Register';
import Login from 'pages/Auth/Login';
import { MainLayout } from 'layouts';
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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
