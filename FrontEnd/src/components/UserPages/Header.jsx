import React from 'react';
import { Link } from 'react-router-dom';
import './UserPages.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="user-header">
      <button className="hamburger" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <Link to="/about" className="header-title">MindScribe</Link>
    </header>
  );
};

export default Header;
