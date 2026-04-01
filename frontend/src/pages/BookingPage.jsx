import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import { providers } from '../Data/ShopData';
import './BookingPage.css';

const BookingPage = () => {
  const { serviceKey, id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const provider = providers.find(
    (p) => p.serviceKey === serviceKey && p.id === parseInt(id)
  );

  const [formData, setFormData] = useState({
    name: user?.name || '',
    date: '',
    location: '',
    description: '',
  });

  const handleBooking = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.date || !formData.location) {
      alert('❌ Please fill in all required fields.');
      return;
    }

    const newBooking = {
      userId: user?.id,
      userName: user?.name, // ✅ Important fix
      serviceName: provider.name,
      providerId: provider.id,
      date: formData.date,
      time: '09:00',
      location: formData.location,
      description: formData.description,
      status: 'confirmed',
    };

    addBooking(newBooking);

    navigate('/otp-verification', {
      state: {
        type: 'booking',
        shopName: provider.name,
        amount: provider.price,
        bookingData: formData,
      },
    });
  };

  if (!provider) {
    return <div className="booking-container"><h2>Provider not found</h2></div>;
  }

  return (
    <div className="booking-container">
      <h2>Book Service with {provider.name}</h2>
      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description (Optional):</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
