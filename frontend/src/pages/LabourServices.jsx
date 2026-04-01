import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicePages.css';

const LabourServices = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      experience: '8 years',
      rating: 4.8,
      skills: ['Construction', 'Demolition', 'Heavy Lifting'],
     
      location: 'Delhi',
      image: '👨‍🔧'
    },
    {
      id: 2,
      name: 'Suresh Singh',
      experience: '6 years',
      rating: 4.6,
      skills: ['Masonry', 'Concrete Work', 'Tile Work'],
    
      location: 'Mumbai',
      image: '👨‍🏭'
    },
    {
      id: 3,
      name: 'Vijay Sharma',
      experience: '10 years',
      rating: 4.9,
      skills: ['Carpentry', 'Furniture Assembly', 'Flooring'],
   
      location: 'Bangalore',
      image: '👨‍🔨'
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
            <span className="service-icon">👷</span>
            Labour Services
          </h1>
          <p className="service-description">
            Find skilled construction workers, helpers, and manual laborers for your projects.
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
                  <label className="form-label">Work Description</label>
                  <textarea className="form-input" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input type="date" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration (Days)</label>
                  <input type="number" className="form-input" min="1" required />
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

export default LabourServices;