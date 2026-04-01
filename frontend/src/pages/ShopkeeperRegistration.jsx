import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Added Link
import './RegistrationPages.css';

const ShopkeeperRegistration = () => {
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
    shopImage: null
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, shopImage: file });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.shopAddress.trim()) newErrors.shopAddress = 'Shop address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    if (!formData.shopCategory) newErrors.shopCategory = 'Shop category is required';
    if (!formData.workingHours) newErrors.workingHours = 'Working hours are required';
    if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST Number is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License Number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formToSave = {
        ...formData,
        userType: 'shopkeeper',
        status: 'Pending',
        image: formData.shopImage ? URL.createObjectURL(formData.shopImage) : null
      };

      const existing = JSON.parse(localStorage.getItem('shopkeeperRegistrations')) || [];
      localStorage.setItem('shopkeeperRegistrations', JSON.stringify([...existing, formToSave]));

      navigate('/Shop-Dashboard'); // redirect after registration
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="registration-form-container">
          <div className="form-header">
            <h1 className="form-title">
              <span className="form-icon">🏪</span> Shopkeeper Registration
            </h1>
            <p className="form-subtitle">Register your shop and connect with customers</p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label>Shop Name *</label>
                <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} className={errors.shopName ? 'error' : ''} />
                {errors.shopName && <span className="error-message">{errors.shopName}</span>}
              </div>
              <div className="form-group">
                <label>Owner Name *</label>
                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={errors.ownerName ? 'error' : ''} />
                {errors.ownerName && <span className="error-message">{errors.ownerName}</span>}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            {/* Address */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Shop Address *</label>
                <textarea name="shopAddress" value={formData.shopAddress} onChange={handleChange} className={errors.shopAddress ? 'error' : ''} />
                {errors.shopAddress && <span className="error-message">{errors.shopAddress}</span>}
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Upload Shop Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {formData.shopImage && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(formData.shopImage)} alt="Shop Preview" height="100" />
                  </div>
                )}
              </div>
            </div>

            {/* City, State, Pincode */}
            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''} />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>State *</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={errors.pincode ? 'error' : ''} />
                {errors.pincode && <span className="error-message">{errors.pincode}</span>}
              </div>
            </div>

            {/* Category & Hours */}
            <div className="form-row">
              <div className="form-group">
                <label>Working Hours *</label>
                <select name="workingHours" value={formData.workingHours} onChange={handleChange} className={errors.workingHours ? 'error' : ''}>
                  <option value="">Select Working Hours</option>
                  <option value="6am-10pm">6 AM - 10 PM</option>
                  <option value="7am-9pm">7 AM - 9 PM</option>
                  <option value="8am-8pm">8 AM - 8 PM</option>
                  <option value="9am-6pm">9 AM - 6 PM</option>
                  <option value="24hours">24 Hours</option>
                </select>
                {errors.workingHours && <span className="error-message">{errors.workingHours}</span>}
              </div>
            </div>

            {/* GST & License */}
            <div className="form-row">
              <div className="form-group">
                <label>GST Number *</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className={errors.gstNumber ? 'error' : ''} />
                {errors.gstNumber && <span className="error-message">{errors.gstNumber}</span>}
              </div>
              <div className="form-group">
                <label>License Number *</label>
                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className={errors.licenseNumber ? 'error' : ''} />
                {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
              </div>
            </div>

            {/* Passwords */}
            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Register & Verify Phone
            </button>

            {/* ✅ Fixed Login Link */}
            <div className="form-links">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="link">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperRegistration;
