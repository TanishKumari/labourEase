import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Shield, Store } from 'lucide-react';
import './Home.css';

const Home = () => {
  const userTypes = [
    { type: 'user', icon: Users, title: 'Join as User', description: 'Find and book labour services near you', color: 'blue-gradient' },
    { type: 'shopkeeper', icon: Store, title: 'Join as Shopkeeper', description: 'Provide labour services to customers', color: 'green-gradient' },
    { type: 'franchisee', icon: Briefcase, title: 'Join as Franchisee', description: 'Manage multiple service providers', color: 'orange-gradient' },
    { type: 'admin', icon: Shield, title: 'Join as Admin', description: 'Manage the entire platform', color: 'purple-gradient' },
  ];

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Skilled Workers for Every Work</h1>
          <p className="hero-description">Connect with professional laborers, electricians, plumbers, painters, and more. Your one-stop solution for all service needs.</p>
          <div className="hero-buttons">
            <Link to="/services" className="primary-btn"><span>Explore Services</span><ArrowRight className="icon" /></Link>
            <Link to="/login" className="secondary-btn">Login to Account</Link>
          </div>
        </div>
      </section>
  
    <section className="cta">
  <div className="container">
    <div className="cta-content">
      <h2>Ready to Get Started?</h2>
      <p>Join thousands of satisfied customers who found the perfect workers for their needs.</p>
      <div className="cta-button-wrapper">
        <Link to="/register/user" className="cta-btn">Register Now</Link>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
