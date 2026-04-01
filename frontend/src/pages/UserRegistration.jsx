import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./RegistrationPages.css";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful ✅");
      navigate("/login");

    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="register-container">

      <h2>Create Account</h2>
      <p className="subtitle">Join LabourEase today</p>

      <form className="register-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="Enter phone number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required />
        </div>

        <button className="submit-btn" type="submit">
          Register
        </button>

        <p className="login-link">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
  );
};

export default UserRegistration;