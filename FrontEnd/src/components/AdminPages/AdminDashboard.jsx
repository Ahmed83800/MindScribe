import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import UsersList from './UsersList';
import ComplaintsList from './ComplaintsList';
import AdminBlog from './AdminBlog';
import './AdminPages.css';

const AdminDashboard = () => {
  const [page, setPage] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    if (page === 'users') return <UsersList />;
    if (page === 'complaints') return <ComplaintsList />;
    if (page === 'adminBlog') return <AdminBlog />;
    return null;
  };

  return (
    <>


      <AdminHeader onToggleSidebar={() => setSidebarOpen(prev => !prev)} />


      {/* Sidebar */}
      <div className={`admin-navbar-container ${sidebarOpen ? '' : 'closed'}`}>
        <nav className="admin-navbar">
          <button onClick={() => setPage('users')}>Users</button>
          <button onClick={() => setPage('complaints')}>Complaints</button>
          <button onClick={() => setPage('adminBlog')}>Manage Blogs</button>
          <button onClick={() => window.location.reload()}>Logout</button>
        </nav>
      </div>

      {/* Page Content */}
      <div className="admin-page-content">{renderPage()}</div>
    </>
  );
};

export default AdminDashboard;
