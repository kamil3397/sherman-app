import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ContextProvider } from 'context/ContextProvider';
import App from './App';
import './config/axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>

);

/* Praca domowa:
1. Zrobic theme wedle tego jak opisane w pliku theme
2. Usunac makeRequest i uzywac axiosa
3. Napisac funkcje getDuration usun wczensiej makeRequest
cherryPick?????
*/
