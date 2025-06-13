import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AdminLoginForm from './components/AdminLoginForm';
import WelcomePage from './components/WelcomePage/WelcomePage';
import AboutUs from "./components/UserPages/AboutUs";
import UserDashboard from './components/UserPages/UserDashboard';
import './components/AuthForm.css';

const AppWrapper = () => {
  const userId = localStorage.getItem("userId"); 
  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard/*" element={<UserDashboard userId={"userId"} />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
