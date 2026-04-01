import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesCard.css';

const ServiceCard = ({ worker, onBookNow }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${worker.id}`);
  };

  return (
    <div className="worker-card">
      <div className="worker-avatar">
        <span className="avatar-icon">{worker.image}</span>
      </div>

      <div className="worker-info">
        <h3 className="worker-name">{worker.name}</h3>
        <div className="worker-meta">
          <span className="experience">{worker.experience} experience</span>
          <span className="rating">⭐ {worker.rating}</span>
        </div>
        <div className="worker-location">📍 {worker.location}</div>
        <div className="worker-skills">
          {worker.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
        <div className="worker-price">{worker.price}</div>
      </div>

      <div className="worker-actions">
        <button className="btn btn-primary" onClick={() => onBookNow(worker)}>
          Book Now
        </button>
        <button className="btn btn-secondary" onClick={handleViewProfile}>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
