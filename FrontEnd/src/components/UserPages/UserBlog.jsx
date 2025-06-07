import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPages.css';

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(() => setMessage('Failed to load blogs'));
  }, []);

  return (
    <div className="user-blog-container">
      <h2 className="user-blog-header">Blogs</h2>
      {message && <p className="user-blog-message">{message}</p>}
      <div className="user-blog-grid">
        {blogs.map(blog => (
          <div key={blog._id} className="user-blog-card">
            <h3 className="user-blog-card-title">{blog.title}</h3>
            <p className="user-blog-card-content">{blog.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBlog;