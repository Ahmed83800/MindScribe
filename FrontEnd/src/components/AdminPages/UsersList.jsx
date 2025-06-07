// src/components/AdminPages/UsersList.jsx
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './AdminPages.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users');
      if (!res.ok) throw new Error('Failed to load users');
      setUsers(await res.json());
      setError('');
    } catch {
      setError('Could not load users.');
      setUsers([]);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleDeleteClick = (user) => {
    setDeleteCandidate(user);
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${deleteCandidate._id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error();
      setDeleteCandidate(null);
      loadUsers();
      setError('');
    } catch {
      setError('Failed to delete user.');
      setDeleteCandidate(null);
    }
  };

  const cancelDelete = () => {
    setDeleteCandidate(null);
  };

  return (
    <div className="admin-section">
      <h2>All Users</h2>

      {/* Delete confirmation popup */}
      {deleteCandidate && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>Delete user <strong>{deleteCandidate.username}</strong> and all their data?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-grid">
        {users.map(u => (
          <fieldset key={u._id} className="admin-card">
            <legend>{u.username}</legend>
            <p>Name: {u.fullName || '-'}</p>
            <p>Email: {u.email || '-'}</p>
            <button className="delete-btn" onClick={() => handleDeleteClick(u)}>
              <FaTrash />
            </button>
          </fieldset>
        ))}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default UsersList;
