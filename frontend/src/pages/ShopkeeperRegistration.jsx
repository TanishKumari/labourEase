import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegistrationPages.css';

const ShopkeeperRegistration = () => {

  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    shopAddress: '',
    city: '',
    state: '',
    pincode: '',
    shopCategory: '',
    gstNumber: '',
    licenseNumber: '',
    workingHours: '',
    password: '',
    confirmPassword: '',
    shopImage: ''
  });

  const [errors, setErrors] = useState({});

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // IMAGE BASE64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        shopImage: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.shopName) newErrors.shopName = "Required";
    if (!formData.ownerName) newErrors.ownerName = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.password) newErrors.password = "Required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("https://labourease.onrender.com/api/shopkeeper/register", {
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
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">

      {/* 🔥 LOADER */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Registering your shop... ⏳</p>
          </div>
        </div>
      )}

      {!isSubmitted ? (

        <div className="container">

          <h2>🏪 Shopkeeper Registration</h2>

          <form onSubmit={handleSubmit}>

            <input name="shopName" placeholder="Shop Name" onChange={handleChange} />
            <input name="ownerName" placeholder="Owner Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input name="shopAddress" placeholder="Address" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="state" placeholder="State" onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} />
            <input name="gstNumber" placeholder="GST Number" onChange={handleChange} />
            <input name="licenseNumber" placeholder="License Number" onChange={handleChange} />

            <select name="workingHours" onChange={handleChange}>
              <option value="">Working Hours</option>
              <option value="6am-10pm">6AM-10PM</option>
              <option value="24hours">24 Hours</option>
            </select>

            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

            <input type="file" onChange={handleImageChange} />

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>

        </div>

      ) : (

        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2 style={{ color: "green" }}>🎉 Registration Successful</h2>

          <p>
            Your shop has been registered successfully.
            <br />
            Please wait for admin approval.
          </p>

          <p style={{ color: "orange" }}>
            ⏳ Status: Pending
          </p>

          <button onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>

      )}

    </div>
  );
};

export default ShopkeeperRegistration;
