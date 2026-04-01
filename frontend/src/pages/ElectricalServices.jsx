import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicePages.css';

const ElectricalServices = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'Amit Electrician',
      experience: '12 years',
      rating: 4.9,
      skills: ['Wiring', 'Panel Installation', 'Motor Repair'],
    
      location: 'Delhi',
      image: '👨‍🔧'
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      experience: '9 years',
      rating: 4.7,
      skills: ['Home Wiring', 'Fan Installation', 'LED Setup'],
    
      location: 'Chennai',
      image: '⚡'
    },
    {
      id: 3,
      name: 'Deepak Singh',
      experience: '15 years',
      rating: 4.8,
      skills: ['Industrial Wiring', 'Transformer Work', 'Maintenance'],
   
      location: 'Pune',
      image: '🔌'
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
            <span className="service-icon">⚡</span>
            Electrical Services
          </h1>
          <p className="service-description">
            Professional electricians for all your electrical installation and repair needs.
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
                  <label className="form-label">Electrical Work Type</label>
                  <select className="form-select" required>
                    <option value="">Select work type</option>
                    <option value="wiring">New Wiring</option>
                    <option value="repair">Repair Work</option>
                    <option value="installation">Installation</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
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

export default ElectricalServices;