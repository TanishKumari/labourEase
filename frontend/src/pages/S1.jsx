import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 'labour',
      title: 'Labour Services',
      description: 'General construction and manual labor services',
      icon: '👷',
      path: '/services/labour',
      color: '#ff6b6b'
    },
    {
      id: 'electrical',
      title: 'Electrical Services',
      description: 'Electrical installation, repair, and maintenance',
      icon: '⚡',
      path: '/services/electrical',
      color: '#4ecdc4'
    },
    {
      id: 'agriculture',
      title: 'Agriculture Services',
      description: 'Farming, gardening, and agricultural support',
      icon: '🌾',
      path: '/services/agriculture',
      color: '#45b7d1'
    },
    {
      id: 'plumber',
      title: 'Plumber Services',
      description: 'Plumbing installation, repair, and maintenance',
      icon: '🔧',
      path: '/services/plumber',
      color: '#f9ca24'
    },
    {
      id: 'painter',
      title: 'Painter Services',
      description: 'Interior and exterior painting services',
      icon: '🎨',
      path: '/services/painter',
      color: '#f0932b'
    },
    {
      id: 'homemaker',
      title: 'Home Maker Services',
      description: 'Household management and cleaning services',
      icon: '🏠',
      path: '/services/homemaker',
      color: '#eb4d4b'
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">Choose from our wide range of professional services</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <Link 
              key={service.id} 
              to={service.path} 
              className="service-card"
              style={{ '--accent-color': service.color }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;