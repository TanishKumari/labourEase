import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import './ShopDashboard.css';

const ShopDashboard = () => {
  const { user } = useAuth();
  const { bookings, updateBooking } = useBookings();

  const [activeTab, setActiveTab] = useState('bookings');
  const [shopBookings, setShopBookings] = useState([]);
  const [userRequirements, setUserRequirements] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredBookings = bookings.filter(b => b.providerId === user.id);
      setShopBookings(filteredBookings);

      const allRequirements = JSON.parse(localStorage.getItem('userRequirements')) || [];
      const relatedRequirements = allRequirements.filter(req => req.shopId === user.id);
      setUserRequirements(relatedRequirements);
    }
  }, [bookings, user]);

  const handleStatusUpdate = (bookingId, newStatus) => {
    updateBooking(bookingId, { status: newStatus });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Shop Dashboard</h1>
        <p>Welcome, {user?.name || "!"}</p>
      </header>

      {/* Tabs */}
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>
          Booking Requests ({shopBookings.length})
        </button>
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
          All Users ({userRequirements.length})
        </button>
        <button onClick={() => setActiveTab('requirements')} className={activeTab === 'requirements' ? 'active' : ''}>
          User Requirements ({userRequirements.length})
        </button>
      </div>

      {/* Summary */}
      <div className="summary-row">
        <div className="summary-card">
          <p>Pending</p>
          <h3>{shopBookings.filter(b => b.status === 'pending').length}</h3>
        </div>
        <div className="summary-card">
          <p>Total Users</p>
          <h3>{userRequirements.length}</h3>
        </div>
        <div className="summary-card">
          <p>In Progress</p>
          <h3>{shopBookings.filter(b => b.status === 'in-progress').length}</h3>
        </div>
        <div className="summary-card">
          <p>Completed</p>
          <h3>{shopBookings.filter(b => b.status === 'completed').length}</h3>
        </div>
      </div>

      {/* === Active Tabs === */}
      <div className="card-grid">
        {activeTab === 'bookings' && (
          shopBookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            shopBookings.map((b, idx) => (
              <div key={idx} className="info-card">
                <h3>{b.userName || 'Unnamed User'}</h3>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Location:</strong> {b.location}</p>
                <p><strong>Description:</strong> {b.description}</p>
                <p><strong>Status:</strong> <span className={`status ${b.status}`}>{b.status}</span></p>
                {b.status === 'pending' && (
                  <div className="card-actions">
                    <button onClick={() => handleStatusUpdate(b.id, 'in-progress')}>Accept</button>
                    <button onClick={() => handleStatusUpdate(b.id, 'rejected')}>Reject</button>
                  </div>
                )}
              </div>
            ))
          )
        )}

        {activeTab === 'users' && (
          userRequirements.length === 0 ? (
            <p>No users found.</p>
          ) : (
            userRequirements.map((req, idx) => (
              <div key={idx} className="info-card">
                <h3>{req.name}</h3>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Location:</strong> {req.location}</p>
              </div>
            ))
          )
        )}

        {activeTab === 'requirements' && (
          userRequirements.length === 0 ? (
            <p>No requirements found.</p>
          ) : (
            userRequirements.map((req, idx) => (
              <div key={idx} className="info-card">
                <h3>{req.name}</h3>
                <p><strong>Services:</strong> {req.services}</p>
                <p><strong>Budget:</strong> ₹{req.budget}</p>
                <p><strong>Preferred Time:</strong> {req.preferredTime}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Location:</strong> {req.location}</p>
                {req.priority && <span className="priority">{req.priority}</span>}
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default ShopDashboard;