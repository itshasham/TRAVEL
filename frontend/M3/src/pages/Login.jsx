import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/token'; // Import the useAuth hook
import ImageSlider from './ImageSlider'; // Import your ImageSlider component

const Login = () => {
  const [user1, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth(); // Use the storeTokenInLS function from the Auth context
  
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user1,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        body: JSON.stringify(user1),
      });
     

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      
      // Check if user is an admin
      const {user}=useAuth();
      
      // Save token to local storage and context state
      storeTokenInLS(data.token);
      console.log("Login Successfully")
      alert('Login successful');
      console.log(user.admin);
      
      
      
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Login failed. Please try again.');
      alert('Login failed. Please try again.'); // Display user-friendly message
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          {/* Sign Up Text in top-left corner */}
          <h1 className="signup-text" onClick={() => navigate('/register')}>
            Sign Up
          </h1>
          {/* Welcome Back Message */}
          <p className="welcome-message">Welcome Back</p>
          <h1>Login Your Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user1.email}
                onChange={handleInput}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user1.password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="btn-submit" type="submit">
              Login
            </button>
          </form>
          {/* Forget Password Text */}
          <h1 className="forget-password-text" onClick={() => alert('Forgot Password')}>
            Forgot Password?
          </h1>
        </div>

        <div className="slider-section">
          <ImageSlider /> {/* Include your ImageSlider here */}
        </div>
      </div>
    </div>
  );
};

export default Login;
