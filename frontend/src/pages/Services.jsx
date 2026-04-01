import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench, Paintbrush, Plug, Construction,
  Ruler, Tractor, UserCheck, ArrowRight, Search
} from 'lucide-react';
import './Services.css';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: 'labour',
      name: 'Labour',
      icon: UserCheck,
      description: 'Hire skilled labourers for construction and repair work.',
      color: 'gray',
    },
    {
      id: 'electrician',
      name: 'Electrician',
      icon: Plug,
      description: 'Certified electricians for all your electrical needs.',
      color: 'orange',
    },
    {
      id: 'painter',
      name: 'Painter',
      icon: Paintbrush,
      description: 'Wall painting, whitewash, and creative design services.',
      color: 'blue',
    },
    {
      id: 'plumber',
      name: 'Plumber',
      icon: Wrench,
      description: 'Plumbing repairs, fitting, and water system maintenance.',
      color: 'teal',
    },
    {
      id: 'interior-designer',
      name: 'Interior Designer',
      icon: Ruler,
      description: 'Modern and aesthetic interior designs for home & office.',
      color: 'purple',
    },
    {
      id: 'house-builder',
      name: 'House Builder',
      icon: Construction,
      description: 'Construction and renovation of residential buildings.',
      color: 'red',
    },
    {
      id: 'agriculture',
      name: 'Agriculture Services',
      icon: Tractor,
      description: 'Farming equipment, labor, and agricultural services.',
      color: 'green',
    },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services-page">
      <div className="page-header">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">
          Choose from our wide range of professional labour and service categories to find exactly what you need.
        </p>
      </div>

      {/* 🔍 Only visible on Services page */}
      <div className="search-wrapper">
  <div className="search-input-container">
    <Search className="search-icon-inside" size={18} />
    <input
      type="text"
      placeholder="Search for a service..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="service-search-box"
    />
  </div>
</div>


      <div className="services-grid">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link key={service.id} to={`/services/${service.id}`} className="service-card">
              <div className={`service-icon icon-${service.color}`}>
                <Icon size={36} />
              </div>
              <h3 className="service-title">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-arrow">
                <ArrowRight />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="custom-service-box">
        <h2 className="custom-service-title">Need Custom Services?</h2>
        <p className="custom-service-desc">
          Can't find what you're looking for? Contact us for custom service requirements.
        </p>
        <Link to="/contact" className="contact-button">Contact Support</Link>
      </div>
    </div>
  );
};

export default Services;
