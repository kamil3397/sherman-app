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
✅1. Zrobic theme wedle tego jak opisane w pliku theme
2. Usunac makeRequest i uzywac axiosa
3. Napisac funkcje getDuration usun wczensiej makeRequest
cherryPick?????
*/

/* Praca domowa:
1.✅ Usunac makeRequest i uzywac axiosa
2.✅ Hover na godziny
  ✅+ przerzucenie godzin do configu
  ✅- powinienes podac w .env zakres godzin* zeby bylo to configurowalne
  ✅- zakres godzin to - startHour i endHour
3. Filtrowac na backendzie eventy na podstawie przeslanych dat!!!
*/

/* Praca domowa 15.01
1. Usunac jedno today( lepiej to po lewej) z Calendar
2. Poprawic hover na dniu (szarym)
3. Dokonczyc/poprawic theme
4. Dodawanie eventu ma wygladac jak w Google Calendar:
  + tytul
  + godzina
  + opis
  + dodawanie gosci (na razie puste, tutaj bedzie MultiSelect na podstawie zarejestrowanych uzytkownikow);
  + opis
  - wybor typu eventu
  - lokalizacje

  KAZDY PUNKT TO ODDZIELNA PRKA
  JESLI PR BEDZIE ZAWIERAC ZMIANY Z PR POPRZEDNIEJ TO NIE SPRAWDZAM, A JAK DO LEKCJI NIE BEDA ROZBITE NA DWIE NIEZALEZNE
  TO ROBIMY SOBIE NA LEKCJI :)
*/
