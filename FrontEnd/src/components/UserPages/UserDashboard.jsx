import React, { useState } from 'react';
import Header from './Header';
import AddThought from './AddThought';
import AllThoughts from './AllThoughts';
import Sentiment from './Sentiment';
import ComplaintForm from './ComplaintForm';
import './UserPages.css';

const UserDashboard = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState('add');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      default:
        return <AddThought userId={userId} />;
    }
  };

  return (
    <>
      <Header />

      <div className={`user-navbar-container ${sidebarOpen ? '' : 'closed'}`}>
        <div className="user-navbar">
          <button onClick={() => setCurrentPage('add')}>Add New Thought</button>
          <button onClick={() => setCurrentPage('all')}>See All Thoughts</button>
          <button onClick={() => setCurrentPage('sentiment')}>Sentiment Analysis</button>
          <button onClick={() => setCurrentPage('complaint')}>Complaint Form</button>
        </div>
      </div>

      <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '←' : '→'}
      </button>

      <div className="user-page-content">{renderPage()}</div>
    </>
  );
};

export default UserDashboard;
