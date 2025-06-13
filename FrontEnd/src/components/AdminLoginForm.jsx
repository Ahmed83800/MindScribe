import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminPages/AdminDashboard';
import './AuthForm.css';

const AdminLogin = () => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [logged, setLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setCreds(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
      });

      if (res.ok) {
        setLogged(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid admin credentials');
      }
    } catch {
      setErrorMessage('Server error. Please try again later.');
    }
  };

  if (logged) return <AdminDashboard />;

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

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
