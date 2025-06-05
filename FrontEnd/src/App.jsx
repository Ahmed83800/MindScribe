import React, { useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AdminLoginForm from './components/AdminLoginForm';
import './components/AuthForm.css';

function App() {
  const [activeForm, setActiveForm] = useState(null);

  const renderForm = () => {
    if (activeForm === 'signup') return <SignupForm />;
    if (activeForm === 'login') return <LoginForm />;
    if (activeForm === 'admin') return <AdminLoginForm />;
    return null;
  };

  return (
    <div className="app-container">
      {/* Back button */}
      {activeForm && (
        <button
          onClick={() => setActiveForm(null)}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          &larr; Back
        </button>
      )}

      {/* Show buttons only when no form is active */}
      {!activeForm && (
        <div className="welcome-message">
          <div>
            <h1>Welcome to MindScribe</h1>
            <p>Your thoughts, your voice. Let's get started!</p>
          </div>
          <div className="button-group">
            <button onClick={() => setActiveForm('signup')}>Sign Up</button>
            <button onClick={() => setActiveForm('login')}>Login</button>
            <button onClick={() => setActiveForm('admin')}>Admin Login</button>
          </div>
        </div>  
      )}

      {/* Render the correct form */}
      {renderForm()}
    </div>
  );
}

export default App;