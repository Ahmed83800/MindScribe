// src/components/AdminHeader.jsx
import React from 'react';
import './AdminPages.css';

const AdminHeader = ({ onToggleSidebar }) => {
  return (
   <header className="admin-header">
  <button className="hamburger" onClick={onToggleSidebar}>
    <div></div>
    <div></div>
    <div></div>
  </button>
  <h1>Admin Panel</h1>
</header>

  );
};

export default AdminHeader;
