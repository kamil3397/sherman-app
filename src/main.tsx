// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  App from './App'
import { ContextProvider } from './context/ContextProvider'
import './config/axios'
createRoot(document.getElementById('root')as HTMLElement).render(
  <ContextProvider>
    <App/>
  </ContextProvider>,
)
