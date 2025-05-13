import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css'; // Ensure global styles are imported from the correct path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
