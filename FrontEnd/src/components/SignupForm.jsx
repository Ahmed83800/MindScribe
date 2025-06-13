import React, { useState } from 'react';
import './AuthForm.css';
import UserDashboard from './UserPages/UserDashboard';
import { useNavigate } from 'react-router-dom';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

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
        setIsLoggedIn(true);
        setUserId(data.userId);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An error occurred during signup');
    }
  };

  if (isLoggedIn && userId) {
    return <UserDashboard userId={userId} />;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Back Arrow */}
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

      {/* Wrapper: Left and Right */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '4rem' }}>
        
        {/* Terms & Conditions (Left) */}
        <div className="auth-form" style={{ width: '400px', marginRight: '2rem', color: 'white' }}>
          <h2>Terms & Conditions</h2>
          <p style={{ fontSize: '0.9rem' }}>
            At MindScribe, your privacy is our top priority. All your thoughts are securely stored and never
            shared with anyone. We don’t use your personal reflections for ads or analysis. This space is
            entirely yours — a calm, judgment-free zone where you can be yourself. 
            <br /><br />
            By signing up, you agree that you understand how your data is used and accept our privacy policy.
            We’re here to support your mental wellness — not to exploit your personal space.
          </p>
          <label style={{ display: 'block', marginTop: '1rem' }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />{' '}
            I agree to the terms and conditions
          </label>
        </div>

        {/* Signup Form (Right) */}
        <form className="auth-form" onSubmit={handleSignup} style={{ width: '400px' }}>
          <h2>Sign Up to MindScribe</h2>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

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
          <button type="submit" disabled={!agreed}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
