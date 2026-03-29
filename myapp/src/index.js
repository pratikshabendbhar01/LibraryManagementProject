// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // optional, if you have CSS

// Create root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);