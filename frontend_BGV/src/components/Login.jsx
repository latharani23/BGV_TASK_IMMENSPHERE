import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './Login.css'; 

const Login = () => {
  // State to store form input data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to store messages (success or error)
  const [message, setMessage] = useState("");

  // useNavigate hook for redirecting
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to the backend to login the user
      const response = await axios.post("http://localhost:3000/api/login", formData);

      // On successful login, store the token (e.g., in localStorage or state)
      localStorage.setItem("token", response.data.token);

      // Display success message
      setMessage("Login successful!");

      // Redirect to the Home page after successful login
      navigate("/home");  // Use useNavigate to redirect
    } catch (error) {
      // Handle any errors (e.g., invalid credentials)
      setMessage(error.response ? error.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Display message (success or error) */}
      {message && <p>{message}</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
