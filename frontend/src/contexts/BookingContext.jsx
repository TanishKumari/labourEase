// src/Context/BookingContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext({
  bookings: [],
  addBooking: () => {},
  updateBooking: () => {},
  cancelBooking: () => {},
  getUserBookings: () => [],
});

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBooking = (id, updates) => {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, ...updates } : booking
    );
    setBookings(updated);
  };

  const cancelBooking = (id) => {
    updateBooking(id, { status: 'cancelled' });
  };

  const getUserBookings = (userId) => {
    return bookings.filter((b) => b.userId === userId);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBooking,
        cancelBooking,
        getUserBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
