import './App.css';
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from 'layouts';
import { ToastContainer } from 'react-toastify';
import Calendar from 'pages/Training/Calendar';
import { Loader } from 'components/Loader';
//przerob import na lazy import

const HomePage = lazy(() => import('pages/Home/HomePage'));
const Register = lazy(() => import('pages/Auth/Register'));
const Login = lazy(() => import('pages/Auth/Login'));
const Calendar = lazy(() => import('pages/Training/Calendar'));


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<MainLayout />} > {/*to tez do lazy? */}
            <Route index element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/training' element={<Calendar />} />
          </Route>
        </Routes>
        </Suspense>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
