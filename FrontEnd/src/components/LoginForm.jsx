import React, { useState } from 'react';
import './AuthForm.css';
import UserDashboard from './UserPages/UserDashboard';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');   // ← added

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUserId(data.userId);          // unchanged
        setErrorMessage('');             // clear any old error
      } else {
        setErrorMessage(data.message || 'Login failed');   // ← replaced alert
      }
    } catch {
      setErrorMessage('An error occurred during login');   // ← replaced alert
    }
  };

  if (isLoggedIn && userId) {
    return <UserDashboard userId={userId} />;
  }

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Welcome Back To MindScribe</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* added */}

      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
