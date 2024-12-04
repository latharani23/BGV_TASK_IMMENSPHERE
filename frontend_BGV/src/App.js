import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      {/* Routes for different pages */}
      <Routes>
        {/* Redirect default path to Signup */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </div>
  );
};

export default App;
