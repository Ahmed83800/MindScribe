import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import bg from '../../assets/bg.jpg'; // Adjust path to your image location

function WelcomePage() {
  return (
    <div
      className="welcome-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <div className="welcome-content">
        <h1 className="welcome-title">
          Welcome to{' '}
          <Link to="/about" className="logo-link">
            <span>MindScribe</span>
          </Link>
        </h1>
        <p className="welcome-subtitle">
          Your thoughts, your voice. Let's get started!
        </p>
        <div className="welcome-buttons">
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/admin"><button>Admin Login</button></Link>
        </div>
      </div>
    
    </div>
  );
}

export default WelcomePage;