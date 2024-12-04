// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out!');
    alert('Logged out successfully!');
  };

  const handleProfile = () => {
    console.log('Navigating to profile...');
    navigate('/profile');
  };

  return (
    <div className="home-container">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
        </a>
        {/* Container for icons aligned to the right */}
        <div className="navbar-icons">
          <i
            className="bi bi-person-circle icon profile-icon"
            onClick={handleProfile}
            title="Profile"
          ></i>
          <i
            className="bi bi-box-arrow-right icon logout-icon"
            onClick={handleLogout}
            title="Logout"
          ></i>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
