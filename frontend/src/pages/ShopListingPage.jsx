import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, CreditCard, Store } from 'lucide-react';
import './ShopListingPage.css';
import { providers } from '../Data/ShopData';  // ✅ External data import

const ShopListingPage = () => {
  const { service } = useParams();
  const [filterType, setFilterType] = useState('all');

  const filteredProviders = providers.filter(
    provider => filterType === 'all' || provider.type === filterType
  );

  return (
    <div className="shop-page">
      <div className="container">
        <div className="header">
          <h1>Service Providers Near You</h1>
          <p>
            Choose from verified shops and franchisees for {service?.replace('-', ' ')} services
          </p>
        </div>

        <div className="filter-tabs">
          {['all', 'shop', 'franchisee'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`filter-btn ${filterType === type ? 'active' : ''}`}
            >
              {type === 'all' ? 'All Providers' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </button>
          ))}
        </div>

        <div className="provider-grid">
          {filteredProviders.map(provider => (
            <div className="provider-card" key={provider.id}>
              <div className="provider-header">
                <div>
                  <div className="provider-title">
                    <h3>{provider.name}</h3>
                    <span className={`tag ${provider.type}`}>
                      {provider.type === 'franchisee' ? 'Franchisee' : 'Shop'}
                    </span>
                  </div>
                  <p>Owner: {provider.owner}</p>
                  <div className="meta">
                    <span><Clock size={16} /> {provider.experience} experience</span>
                    <span><CreditCard size={16} /> GST: {provider.gst}</span>
                  </div>
                </div>
                <div className="rating">
                  <div>
                    <Star size={16} className="star" />
                    <span>{provider.rating}</span>
                    <span>({provider.reviews})</span>
                  </div>
                  <div className={`status ${provider.availability === 'Available' ? 'available' : 'busy'}`}>
                    {provider.availability}
                  </div>
                </div>
              </div>

              <div className="provider-info">
                <div><MapPin size={16} /> {provider.location} • {provider.distance} away</div>
                <div><Phone size={16} /> {provider.phone}</div>
              </div>

              <div className="specialties">
                <h4>Specialties:</h4>
                <div className="specialty-tags">
                  {provider.specialties.map((s, i) => (
                    <span key={i} className="specialty">{s}</span>
                  ))}
                </div>
              </div>

              <div className="provider-footer">
                <div className="price">₹{provider.price}/day</div>
                <Link
                     to={`/booking/${provider.serviceKey}/${provider.id}`}
                    className={`book-btn ${provider.availability === 'Available' ? 'enabled' : 'disabled'}`}
>
                  {provider.availability === 'Available' ? 'Book Now' : 'Unavailable'}
                    
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="no-providers">
            <Store size={64} />
            <h3>No providers found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopListingPage;
