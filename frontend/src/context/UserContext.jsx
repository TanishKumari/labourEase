import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const cancelBooking = (bookingId) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        bookings,
        setUser,
        addBooking,
        updateBookingStatus,
        cancelBooking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
