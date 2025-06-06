// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import AdminDashboard from './AdminPages/AdminDashboard';
import './AuthForm.css';              // keep existing AuthForm styles

const AdminLogin = () => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [logged, setLogged] = useState(false);

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
      if (res.ok) setLogged(true);
      else alert('Invalid admin credentials');
    } catch {
      alert('Server error');
    }
  };

  if (logged) return <AdminDashboard />;

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input
        name="username"
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
  );
};

export default AdminLogin;
