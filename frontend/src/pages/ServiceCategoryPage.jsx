import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import './ServiceCategoryPage.css';

const ServiceCategoryPage = () => {
  const { category } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const getServicesByCategory = (category) => {
    const services = {
      labour: [
        { id: 1, name: 'General Construction Labour', price: '₹500/day', rating: 4.7 },
        { id: 2, name: 'Site Cleaning Labour', price: '₹450/day', rating: 4.6 },
        { id: 3, name: 'Repair & Maintenance Labour', price: '₹550/day', rating: 4.8 }
      ],
      electrician: [
        { id: 1, name: 'Wiring Installation', price: '₹700/service', rating: 4.9 },
        { id: 2, name: 'Switch & Socket Repair', price: '₹400/service', rating: 4.7 },
        { id: 3, name: 'Appliance Installation', price: '₹500/service', rating: 4.8 }
      ],
      painter: [
        { id: 1, name: 'Interior Wall Painting', price: '₹12/sq.ft', rating: 4.8 },
        { id: 2, name: 'Exterior Painting', price: '₹15/sq.ft', rating: 4.7 },
        { id: 3, name: 'Whitewash Service', price: '₹10/sq.ft', rating: 4.6 }
      ],
      plumber: [
        { id: 1, name: 'Leakage Repair', price: '₹300/service', rating: 4.8 },
        { id: 2, name: 'Tap & Pipe Installation', price: '₹400/service', rating: 4.7 },
        { id: 3, name: 'Bathroom Fittings', price: '₹500/service', rating: 4.9 }
      ],
      'interior-designer': [
        { id: 1, name: 'Living Room Design', price: '₹1000/project', rating: 4.9 },
        { id: 2, name: 'Kitchen Design', price: '₹1200/project', rating: 4.8 },
        { id: 3, name: 'Office Interior', price: '₹2000/project', rating: 4.7 }
      ],
      'house-builder': [
        { id: 1, name: 'New House Construction', price: '₹1500/day', rating: 4.8 },
        { id: 2, name: 'House Renovation', price: '₹1300/day', rating: 4.7 },
        { id: 3, name: 'Modular Additions', price: '₹1400/day', rating: 4.6 }
      ],
      agriculture: [
        { id: 1, name: 'Crop Harvesting', price: '₹500/day', rating: 4.8 },
        { id: 2, name: 'Soil Preparation', price: '₹400/day', rating: 4.7 },
        { id: 3, name: 'Irrigation Setup', price: '₹600/day', rating: 4.9 },
        { id: 4, name: 'Pesticide Spraying', price: '₹300/day', rating: 4.6 },
        { id: 5, name: 'Farm Equipment Operation', price: '₹800/day', rating: 4.8 },
        { id: 6, name: 'Livestock Care', price: '₹450/day', rating: 4.7 }
      ]
    };
    return services[category] || [];
  };

  const getCategoryTitle = (category) => {
    const titles = {
      labour: 'Labour Services',
      electrician: 'Electrician Services',
      painter: 'Painter Services',
      plumber: 'Plumber Services',
      'interior-designer': 'Interior Design Services',
      'house-builder': 'House Builder Services',
      agriculture: 'Agriculture Services'
    };
    return titles[category] || 'Services';
  };

  const services = getServicesByCategory(category || '');

  return (
    <div className="category-wrapper">
      <div className="category-container">
        <div className="category-header">
          <h1 className="category-title">{getCategoryTitle(category || '')}</h1>
          <p className="category-subtext">
            Find skilled professionals for all your {category} needs
          </p>
        </div>

        <div className="service-cards-grid">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/shops/${category}-${service.id}`}
              className="service-card"
            >
              <div className="service-card-inner">
                <div className="service-header">
                  <h3 className="service-name">{service.name}</h3>
                  <div className="service-rating">
                    <Star className="star-icon" />
                    <span>{service.rating}</span>
                  </div>
                </div>

                <div className="service-price">{service.price}</div>

                <div className="service-footer">
                  <div className="location-info">
                    <MapPin className="map-icon" />
                    <span>Available nearby</span>
                  </div>
                  <div className="find-provider">
                    <span>Find Providers</span>
                    <ArrowRight className="arrow-icon" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bulk-booking-box">
          <h2 className="bulk-title">Need Multiple Services?</h2>
          <p className="bulk-desc">
            Book multiple services at once and get better rates from our service providers.
          </p>
          <button className="bulk-button">Contact for Bulk Booking</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategoryPage;
