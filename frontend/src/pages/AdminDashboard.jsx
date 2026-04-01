import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const franchisees = JSON.parse(localStorage.getItem('franchiseeRequests')) || [];
    const shopkeepers = JSON.parse(localStorage.getItem('shopkeeperRegistrations')) || [];
    const all = [...franchisees, ...shopkeepers];
    setRequests(all);
  }, []);

  const updateStatus = (email, newStatus) => {
    const updated = requests.map((r) =>
      r.email === email ? { ...r, status: newStatus } : r
    );
    setRequests(updated);

    const updatedFranchisees = updated.filter(r => r.userType === 'franchisee');
    const updatedShopkeepers = updated.filter(r => r.userType === 'shopkeeper');

    localStorage.setItem('franchiseeRequests', JSON.stringify(updatedFranchisees));
    localStorage.setItem('shopkeeperRegistrations', JSON.stringify(updatedShopkeepers));
  };

  const filtered = filterType === 'all'
    ? requests
    : requests.filter(r => r.userType === filterType);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilterType('all')} className={filterType === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilterType('shopkeeper')} className={filterType === 'shopkeeper' ? 'active' : ''}>Shopkeepers</button>
        <button onClick={() => setFilterType('franchisee')} className={filterType === 'franchisee' ? 'active' : ''}>Franchisees</button>
      </div>

      <div className="card-grid">
        {filtered.map((req, idx) => (
          <div className="card" key={idx}>
            {req.image && (
              <img
                src={req.image}
                alt="Preview"
                className="card-img"
                onClick={() => setSelectedImage(req.image)}
              />
            )}
            <h3>{req.name || req.ownerName}</h3>
            <p><strong>Business:</strong> {req.businessName || req.shopName}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Phone:</strong> {req.phone}</p>
            <p><strong>Type:</strong> {req.userType}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {/* Franchisee Approval Buttons */}
            {req.userType === 'franchisee' && req.status === 'Pending' && (
              <div className="card-actions">
                <button onClick={() => updateStatus(req.email, 'Approved')} className="approve-btn">Approve</button>
                <button onClick={() => updateStatus(req.email, 'Rejected')} className="reject-btn">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
