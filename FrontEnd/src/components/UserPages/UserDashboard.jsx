import React, { useState } from 'react';
import Header from './Header';
import AddThought from './AddThought';
import AllThoughts from './AllThoughts';
import Sentiment from './Sentiment';
import ComplaintForm from './ComplaintForm';
import UserBlog from './UserBlog';
import './UserPages.css';

const UserDashboard = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState('add');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'add':
        return <AddThought userId={userId} />;
      case 'all':
        return <AllThoughts userId={userId} />;
      case 'sentiment':
        return <Sentiment userId={userId} />;
      case 'complaint':
        return <ComplaintForm userId={userId} />;
      case 'blog':
        return <UserBlog userId={userId} />;
      default:
        return <AddThought userId={userId} />;
    }
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className={`user-navbar-container ${sidebarOpen ? 'open' : ''}`}>
          <div className="user-navbar">
            <button onClick={() => setCurrentPage('add')}>Add New Thought</button>
            <button onClick={() => setCurrentPage('all')}>See All Thoughts</button>
            <button onClick={() => setCurrentPage('sentiment')}>Sentiment Analysis</button>
            <button onClick={() => setCurrentPage('complaint')}>Complaint Form</button>
            <button onClick={() => setCurrentPage('blog')}>Blogs</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        {/* Page Content */}
        <div className={`user-page-content ${sidebarOpen ? 'sidebar-shifted' : ''}`}>
          {renderPage()}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
