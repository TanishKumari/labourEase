import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminRegistration.css';

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    localStorage.setItem('loggedInAdmin', JSON.stringify(formData));
    navigate('/admin-dashboard');
  };

  return (
    <div className="admin-register-container">
      <div className="form-card">
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
