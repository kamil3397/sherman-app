import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { ToastContainer } from 'react-toastify';
import { Loader } from './components/Loader/Loader';
import { CalendarProvider } from 'context/CalendarContext';

const HomePage = lazy(()=> import('./pages/Home/HomePage'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Calendar = lazy(() => import('./pages/Calendar/Calendar'));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<MainLayout />} >
              <Route index element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/training' element={
                <CalendarProvider>
                <Calendar />
                </CalendarProvider>
                } />
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer aria-label={undefined}/>
    </>
  );
}

export default App;
