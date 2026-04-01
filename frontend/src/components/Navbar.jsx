import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const registerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">LabourEase</Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/services" className="navbar-link">Services</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>

            {user && (
              <Link to="/current-bookings" className="navbar-link">My Bookings</Link>
            )}

            {!user ? (
              <div className="dropdown" ref={registerRef}>
                <button
                  className="dropdown-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen((prev) => !prev);
                  }}
                >
                  Register
                </button>
                {dropdownOpen && (
                  <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
                    <Link to="/register/user" onClick={() => setDropdownOpen(false)}>User Registration</Link>
                    <Link to="/register/franchisee" onClick={() => setDropdownOpen(false)}>Franchisee Registration</Link>
                    <Link to="/register/shopkeeper" onClick={() => setDropdownOpen(false)}>Shopkeeper Registration</Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="dropdown" ref={profileRef}>
                <button
                  className="profile-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileDropdownOpen((prev) => !prev);
                  }}
                >
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="profile-img" />
                  ) : (
                    <div className="profile-placeholder">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </button>
                {profileDropdownOpen && (
                  <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
                    <Link to="/profile">My Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="navbar-icons">
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
