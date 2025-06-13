import React, { useState } from 'react';
import './AuthForm.css';
import UserDashboard from './UserPages/UserDashboard';
import { useNavigate } from 'react-router-dom'; // ⬅ import

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // ⬅ hook

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
        setUserId(data.userId);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch {
      setErrorMessage('An error occurred during login');
    }
  };

  if (isLoggedIn && userId) {
    return <UserDashboard userId={userId} />;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Back arrow */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: 'gold',
          fontSize: '1.8rem',
          cursor: 'pointer',
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000
        }}
      >
        ←
      </button>

      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Log In To MindScribe</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

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
    </div>
  );
};

export default LoginForm;
