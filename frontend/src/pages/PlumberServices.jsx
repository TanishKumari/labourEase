import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicePages.css';

const PlumberServices = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'Expert Plumber Ram',
      experience: '11 years',
      rating: 4.9,
      skills: ['Pipe Installation', 'Leak Repair', 'Bathroom Fitting'],
    
      location: 'Delhi',
      image: '🔧'
    },
    {
      id: 2,
      name: 'Shyam Water Works',
      experience: '8 years',
      rating: 4.7,
      skills: ['Water Tank Setup', 'Drainage Work', 'Pump Installation'],

      location: 'Mumbai',
      image: '🚿'
    },
    {
      id: 3,
      name: 'Modern Plumber Sonu',
      experience: '6 years',
      rating: 4.6,
      skills: ['Kitchen Plumbing', 'Gas Line Work', 'Fixture Installation'],
   
      location: 'Bangalore',
      image: '🔩'
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
            <span className="service-icon">🔧</span>
            Plumber Services
          </h1>
          <p className="service-description">
            Professional plumbers for all your water, drainage, and pipe-related needs.
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
                  <label className="form-label">Problem Type</label>
                  <select className="form-select" required>
                    <option value="">Select problem type</option>
                    <option value="leak">Water Leak</option>
                    <option value="blockage">Pipe Blockage</option>
                    <option value="installation">New Installation</option>
                    <option value="repair">General Repair</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Problem Description</label>
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

export default PlumberServices;