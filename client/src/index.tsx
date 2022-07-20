import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from './Components/UserContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>
);
