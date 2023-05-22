import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { EventsContextProvider } from './context/EventContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventsContextProvider>
        <App />
      </EventsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
