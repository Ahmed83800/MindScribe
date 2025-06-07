import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPages.css';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      setMessage('Failed to load blogs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', { title, body });
      setTitle('');
      setBody('');
      setMessage('Blog added successfully');
      fetchBlogs();
    } catch (err) {
      setMessage('Error adding blog');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setMessage('Blog deleted successfully');
      fetchBlogs();
    } catch (err) {
      setMessage('Error deleting blog');
    }
  };

  return (
    <div className="admin-blog-container">
      <h2 className="admin-blog-header">Admin Blog Management</h2>

      {message && <p className={`admin-blog-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}

      <div className="admin-blog-form-container">
        <h3 className="admin-blog-subheader">Add New Blog</h3>
        <form onSubmit={handleSubmit} className="admin-blog-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="admin-blog-input"
            required
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Blog Content"
            className="admin-blog-textarea"
            required
            rows="5"
          />
          <button type="submit" className="admin-blog-submit-btn">Add Blog</button>
        </form>
      </div>

      <div className="admin-blog-list-container">
        <h3 className="admin-blog-subheader">Existing Blogs</h3>
        <div className="admin-blog-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="admin-blog-card">
              <h4 className="admin-blog-card-title">{blog.title}</h4>
              <p className="admin-blog-card-content">{blog.body}</p>
              <button 
                onClick={() => handleDelete(blog._id)}
                className="admin-blog-delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;