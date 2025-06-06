// src/components/AdminPages/UsersList.jsx
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './AdminPages.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetch('http://localhost:5000/api/admin/users');
    setUsers(await res.json());
  };

  useEffect(() => { loadUsers(); }, []);

  const deleteUser = async id => {
    if (!window.confirm('Delete user and all their data?')) return;
    await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: 'DELETE' });
    loadUsers();
  };

  return (
    <div className="admin-section">
      <h2>All Users</h2>
      <div className="admin-grid">
        {users.map(u => (
          <fieldset key={u._id} className="admin-card">
            <legend>{u.username}</legend>
            <p>Name: {u.fullName || '-'}</p>
            <p>Email: {u.email || '-'}</p>
            <button className="delete-btn" onClick={() => deleteUser(u._id)}>
              <FaTrash />
            </button>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
