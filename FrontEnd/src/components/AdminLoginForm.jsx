import React, { useState } from 'react';
import './AuthForm.css';

const AdminLoginForm = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Login:', adminData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Enter Admin Login Credentials</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLoginForm;
