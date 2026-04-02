import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FranchiseeRegistration.css';

const FranchiseeRegistration = () => {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    gstNumber: '',
    businessName: '',
    experience: '',
    website: '',
    businessImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2000000) {
      alert("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        businessImage: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://labourease.onrender.com/api/franchisee/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      setIsSubmitted(true);

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      {/* 🔥 LOADER */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Submitting your application... ⏳</p>
          </div>
        </div>
      )}

      <div className="registration-form">

        {!isSubmitted ? (
          <>
            <h2>Franchisee Registration</h2>

            <form onSubmit={handleSubmit}>

              <input type="text" name="name" placeholder="Name" required onChange={handleChange}/>
              <input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
              <input type="text" name="phone" placeholder="Phone" required onChange={handleChange}/>
              <input type="text" name="businessName" placeholder="Business Name" required onChange={handleChange}/>
              <input type="text" name="gstNumber" placeholder="GST Number" required onChange={handleChange}/>
              <textarea name="address" placeholder="Address" required onChange={handleChange}></textarea>
              <input type="text" name="city" placeholder="City" required onChange={handleChange}/>
              <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange}/>
              <input type="number" name="experience" placeholder="Experience" required onChange={handleChange}/>

              <input type="file" onChange={handleImageUpload} required />

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>

            </form>
          </>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "40px",
            background: "#f5f5f5",
            borderRadius: "10px"
          }}>
            <h2 style={{ color: "green" }}>🎉 Registration Successful</h2>

            <p style={{ marginTop: "15px", fontSize: "16px" }}>
              Thank you for registering as a franchisee.
              <br />
              Your request has been sent to admin.
            </p>

            <p style={{ marginTop: "10px", fontWeight: "bold", color: "orange" }}>
              ⏳ Status: Pending Approval
            </p>

            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "blue",
                color: "#fff",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Go to Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FranchiseeRegistration;
