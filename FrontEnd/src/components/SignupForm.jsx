import React, { useState } from 'react';
import './AuthForm.css';
import UserDashboard from './UserPages/UserDashboard';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    isAdmin: false 
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Signup succeeded — set userId & isLoggedIn to show dashboard
        setIsLoggedIn(true);
        setUserId(data.userId);  // Make sure your backend returns this on signup
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  if (isLoggedIn && userId) {
    return <UserDashboard userId={userId} />;
  }

  return (
    <form className="auth-form" onSubmit={handleSignup}>
      <h2>Sign Up to MindScribe</h2>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
