// src/pages/CurrentBookings.jsx
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import './CurrentBookings.css';

const CurrentBookings = () => {
  const { user } = useAuth();
  const { getUserBookings, updateBooking, cancelBooking } = useBookings();

  const [showReschedule, setShowReschedule] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });

  const userBookings = user ? getUserBookings(user.id) : [];

  const getStatus = (status) => {
    const statusMap = {
      pending: { color: 'yellow', icon: <Clock /> },
      confirmed: { color: 'blue', icon: <CheckCircle /> },
      'in-progress': { color: 'purple', icon: <RotateCcw /> },
      completed: { color: 'green', icon: <CheckCircle /> },
      cancelled: { color: 'red', icon: <XCircle /> },
    };
    return statusMap[status] || { color: 'gray', icon: <AlertCircle /> };
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(id);
    }
  };

  const handleReschedule = (id) => {
    if (rescheduleData.date && rescheduleData.time) {
      updateBooking(id, {
        date: rescheduleData.date,
        time: rescheduleData.time,
        status: 'pending',
      });
      setShowReschedule(null);
      setRescheduleData({ date: '', time: '' });
      alert('Booking rescheduled successfully!');
    }
  };

  return (
    <div className="current-bookings">
      <div className="bookings-wrapper">
        {user ? (
          userBookings.length === 0 ? (
            <div className="empty-booking">
              <Calendar className="icon" />
              <h3>No bookings found</h3>
              <p>You haven't made any bookings yet.</p>
            </div>
          ) : (
            userBookings.map((booking) => {
              const status = getStatus(booking.status);
              return (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h4>{booking.serviceName}</h4>
                    <span className={`status ${status.color}`}>
                      {status.icon}
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-details">
                    <p><strong>Date:</strong> {booking.date}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Location:</strong> {booking.location}</p>
                  </div>

                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <div className="booking-actions">
                      <button onClick={() => setShowReschedule(booking.id)}>Reschedule</button>
                      <button className="cancel" onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                    </div>
                  )}

                  {showReschedule === booking.id && (
                    <div className="reschedule-form">
                      <input
                        type="date"
                        value={rescheduleData.date}
                        onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                      />
                      <input
                        type="time"
                        value={rescheduleData.time}
                        onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                      />
                      <button onClick={() => handleReschedule(booking.id)}>Confirm</button>
                    </div>
                  )}
                </div>
              );
            })
          )
        ) : (
          <div className="empty-booking">
            <AlertCircle className="icon" />
            <h3>Not Logged In</h3>
            <p>Please login to view your bookings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBookings;
