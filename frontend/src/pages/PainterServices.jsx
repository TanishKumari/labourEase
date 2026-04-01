import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicePages.css';

const PainterServices = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'Artist Painter Gopal',
      experience: '9 years',
      rating: 4.8,
      skills: ['Interior Painting', 'Exterior Painting', 'Texture Work'],
     
      location: 'Jaipur',
      image: '🎨'
    },
    {
      id: 2,
      name: 'Professional Painter Kiran',
      experience: '7 years',
      rating: 4.7,
      skills: ['Wall Painting', 'Ceiling Work', 'Decorative Painting'],
   
      location: 'Hyderabad',
      image: '🖌️'
    },
    {
      id: 3,
      name: 'Color Expert Manoj',
      experience: '12 years',
      rating: 4.9,
      skills: ['Color Consultation', 'Premium Finishes', 'Wall Art'],
    
      location: 'Kolkata',
      image: '🏠'
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
            <span className="service-icon">🎨</span>
            Painter Services
          </h1>
          <p className="service-description">
            Skilled painters for interior, exterior, and decorative painting work.
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
                  <label className="form-label">Painting Type</label>
                  <select className="form-select" required>
                    <option value="">Select painting type</option>
                    <option value="interior">Interior Painting</option>
                    <option value="exterior">Exterior Painting</option>
                    <option value="both">Both Interior & Exterior</option>
                    <option value="decorative">Decorative Work</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Room/Area Size (sq ft)</label>
                  <input type="number" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Color Preference</label>
                  <input type="text" className="form-input" placeholder="e.g., White, Blue, etc." />
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

export default PainterServices;