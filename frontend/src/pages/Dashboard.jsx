import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user, bookings, cancelBooking, updateBookingStatus } = useUser();
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [completionOtp, setCompletionOtp] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view the dashboard.</p>
        </div>
      </div>
    );
  }

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    setShowCancelModal(null);
  };

  const handleCompleteService = () => {
    if (completionOtp.length === 6 && showCompletionModal) {
      updateBookingStatus(showCompletionModal, 'completed');
      setShowCompletionModal(null);
      setCompletionOtp('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your bookings and track service status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              <p className="text-gray-600">Total Bookings</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter((b) => b.status === 'in-progress').length}
              </p>
              <p className="text-gray-600">Active</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter((b) => b.status === 'completed').length}
              </p>
              <p className="text-gray-600">Completed</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter((b) => b.status === 'cancelled').length}
              </p>
              <p className="text-gray-600">Cancelled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start by booking a service from our catalog</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Services
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {booking.serviceName}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">Provider: {booking.providerName}</p>
                      <div className="flex items-center text-gray-600 text-sm space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {booking.bookingDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => setShowCancelModal(booking.id)}
                          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status === 'in-progress' && (
                        <button
                          onClick={() => setShowCompletionModal(booking.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancel Booking</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelModal(null)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(showCancelModal)}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Completion</h2>
            <p className="text-gray-600 mb-6">
              Enter the completion OTP provided by the service provider to mark this service as complete.
            </p>
            <input
              type="text"
              value={completionOtp}
              onChange={(e) => setCompletionOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="otp-input"
            />
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => {
                  setShowCompletionModal(null);
                  setCompletionOtp('');
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteService}
                disabled={completionOtp.length !== 6}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Complete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
