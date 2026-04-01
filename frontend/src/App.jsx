import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import UserRegistration from './pages/UserRegistration';
import FranchiseeRegistration from './pages/FranchiseeRegistration';
import ShopkeeperRegistration from './pages/ShopkeeperRegistration';
import BookingPage from './pages/BookingPage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import ShopListingPage from './pages/ShopListingPage';
import Contact from './pages/ContactPage';
import OTPVerification from './pages/OTPVerification';
import CurrentBookings from './pages/CurrentBookings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AdminRegistration from './pages/AdminRegistration';
import AdminDashboard from './pages/AdminDashboard';
import  ShopDashboard from './pages/ShopDashboard'
import './App.css';
import Payment from './pages/PaymentPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register/user" element={<UserRegistration />} />
        <Route path="/register/franchisee" element={<FranchiseeRegistration />} />
        <Route path="/register/shopkeeper" element={<ShopkeeperRegistration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services/:category" element={<ServiceCategoryPage />} />
        <Route path="/shops/:service" element={<ShopListingPage />} />
        <Route path="/booking/:serviceKey/:id" element={<BookingPage />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/current-bookings" element={<CurrentBookings />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
         <Route path="/admin-register" element={<AdminRegistration />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/Shop-Dashboard" element={<ShopDashboard />} />
         <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default App;
