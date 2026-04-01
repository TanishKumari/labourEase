import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth(); // Make sure updateUser exists in your context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card center">
          <h2>Login Required</h2>
          <p>Please login to view your profile information.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    if (updateUser) updateUser(formData); // optional update function
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="welcome-message">👋 Welcome, {user.fullName}</h2>
          <p className="subtitle">Here is your profile information</p>
        </div>
        <div className="profile-details">
          {[
            { label: '📛 Full Name', name: 'fullName' },
            { label: '📧 Email', name: 'email' },
            { label: '📞 Phone', name: 'phone' },
            { label: '🏠 Address', name: 'address' },
            { label: '🏙️ City', name: 'city' },
            { label: '📮 Pincode', name: 'pincode' }
          ].map(({ label, name }) => (
            <div className="info-item" key={name}>
              <span className="label">{label}:</span>
              {isEditing ? (
                <input
                  type="text"
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                />
              ) : (
                <span>{user[name]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="edit-buttons">
          {isEditing ? (
            <>
              <button className="save" onClick={handleSave}>💾 Save</button>
              <button className="cancel" onClick={handleCancel}>❌ Cancel</button>
            </>
          ) : (
            <button className="edit" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
