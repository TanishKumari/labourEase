import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicePages.css';

const AgricultureServices = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'Farmers Helper Raj',
      experience: '7 years',
      rating: 4.6,
      skills: ['Crop Harvesting', 'Seed Planting', 'Farm Maintenance'],
   
      location: 'Punjab',
      image: '👨‍🌾'
    },
    {
      id: 2,
      name: 'Krishna Agri Expert',
      experience: '10 years',
      rating: 4.8,
      skills: ['Irrigation Setup', 'Pesticide Spray', 'Land Preparation'],
 
      location: 'Haryana',
      image: '🚜'
    },
    {
      id: 3,
      name: 'Garden Care Mohan',
      experience: '5 years',
      rating: 4.5,
      skills: ['Garden Design', 'Plant Care', 'Landscaping'],
    
      location: 'Kerala',
      image: '🌱'
    }
  ];

  const handleBookNow = (worker) => {
    setSelectedWorker(worker);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${selectedWorker.name}! You will receive a confirmation SMS shortly.`);
    setShowBookingForm(false);
    setSelectedWorker(null);
  };

  return (
    <div className="service-page">
      <div className="container">
        <div className="service-header">
          <h1 className="service-title">
            <span className="service-icon">🌾</span>
            Agriculture Services
          </h1>
          <p className="service-description">
            Expert agricultural workers for farming, gardening, and land management.
          </p>
        </div>

        <div className="workers-grid">
          {workers.map(worker => (
            <ServiceCard 
              key={worker.id} 
              worker={worker} 
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {showBookingForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Book {selectedWorker.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowBookingForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmitBooking} className="booking-form">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Farm/Garden Size (acres)</label>
                  <input type="number" className="form-input" step="0.1" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Work Description</label>
                  <textarea className="form-input" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input type="date" className="form-input" required />
                </div>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgricultureServices;