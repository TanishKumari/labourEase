import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicePages.css';

const HomeMakerServices = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'House Care Sunita',
      experience: '5 years',
      rating: 4.7,
      skills: ['House Cleaning', 'Cooking', 'Laundry'],
     
      location: 'Delhi',
      image: '👩‍🏠'
    },
    {
      id: 2,
      name: 'Home Helper Priya',
      experience: '8 years',
      rating: 4.8,
      skills: ['Deep Cleaning', 'Kitchen Management', 'Child Care'],
     
      location: 'Mumbai',
      image: '🧹'
    },
    {
      id: 3,
      name: 'Care Taker Asha',
      experience: '6 years',
      rating: 4.6,
      skills: ['Elderly Care', 'House Maintenance', 'Garden Care'],
    
      location: 'Bangalore',
      image: '🏡'
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
            <span className="service-icon">🏠</span>
            Home Maker Services
          </h1>
          <p className="service-description">
            Trusted home makers for household management, cleaning, and care services.
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
                  <label className="form-label">Service Type</label>
                  <select className="form-select" required>
                    <option value="">Select service type</option>
                    <option value="cleaning">House Cleaning</option>
                    <option value="cooking">Cooking</option>
                    <option value="childcare">Child Care</option>
                    <option value="eldercare">Elder Care</option>
                    <option value="fulltime">Full-time Help</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">House Size (BHK)</label>
                  <select className="form-select" required>
                    <option value="">Select house size</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="2bhk">2 BHK</option>
                    <option value="3bhk">3 BHK</option>
                    <option value="4bhk">4+ BHK</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Working Hours</label>
                  <select className="form-select" required>
                    <option value="">Select working hours</option>
                    <option value="2hours">2 Hours</option>
                    <option value="4hours">4 Hours</option>
                    <option value="8hours">8 Hours (Full Day)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
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

export default HomeMakerServices;