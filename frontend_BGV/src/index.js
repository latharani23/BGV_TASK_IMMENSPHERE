
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import ReactDOM from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css'; 


// Create root and render the app inside BrowserRouter
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  {/* Wrap your entire app inside BrowserRouter */}
    <App />
  </BrowserRouter>
);

