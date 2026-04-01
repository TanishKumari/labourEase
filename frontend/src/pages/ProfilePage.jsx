import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = ({ user }) => {
  const navigate = useNavigate();
  const bookingAmount = 4000;
  const [selectedMethod, setSelectedMethod] = useState('wallet');

  const insufficientBalance = selectedMethod === 'wallet' && user.wallet < bookingAmount;

  const handlePayment = () => {
    if (!insufficientBalance) {
      alert('Payment successful!');
      navigate('/my-bookings');
    }
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <h1>LaborHub</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/">Services</a>
          <a href="/">My Bookings</a>
          <a href="/">Dashboard</a>
        </nav>
        <div className="user-info">
          <span className="wallet-balance">₹{user.wallet}</span>
          <span className="user-name">John Doe</span>
          <button className="logout">Logout</button>
        </div>
      </header>

      {/* Stepper */}
      <div className="stepper">
        <div className="step completed">
          <CheckCircle size={20} />
          <span>Service Details</span>
        </div>
        <div className="step completed">
          <CheckCircle size={20} />
          <span>Verification</span>
        </div>
        <div className="step active">
          <div className="circle">3</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="payment-container">
        {/* Payment Card */}
        <div className="payment-box">
          <h2>Payment</h2>
          <div className="method-selection">
            <div
              className={`method-option ${selectedMethod === 'wallet' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('wallet')}
            >
              <Wallet />
              <div>
                <p>Wallet</p>
                <span>Balance: ₹{user.wallet}</span>
              </div>
            </div>

            <div
              className={`method-option ${selectedMethod === 'card' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('card')}
            >
              <CreditCard />
              <div>
                <p>Credit/Debit Card</p>
                <span>Secure payment</span>
              </div>
            </div>
          </div>

          {insufficientBalance && (
            <div className="alert-box">
              <AlertCircle size={18} />
              <span>Insufficient wallet balance. Please choose another payment method.</span>
            </div>
          )}

          <button
            className="pay-button"
            onClick={handlePayment}
            disabled={insufficientBalance}
          >
            Pay ₹{bookingAmount} & Confirm Booking
          </button>
        </div>

        {/* Booking Summary */}
        <div className="summary-box">
          <h3>Booking Summary</h3>
          <div className="summary-item">
            <span>Service:</span> <strong>Farm Labor</strong>
          </div>
          <div className="summary-item">
            <span>Duration:</span> <strong>8 hours</strong>
          </div>
          <div className="summary-item">
            <span>Rate:</span> <strong>₹500/hour</strong>
          </div>
          <div className="summary-item">
            <span>Date:</span> <strong>2025-08-30</strong>
          </div>
          <div className="summary-item">
            <span>Time:</span> <strong>12:29</strong>
          </div>
          <div className="summary-total">
            <span>Total Amount:</span> <span className="amount">₹{bookingAmount}</span>
          </div>

          <div className="included-box">
            <h4>What's Included:</h4>
            <ul>
              <li>Professional labor service</li>
              <li>OTP verification for security</li>
              <li>24/7 customer support</li>
              <li>Service guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
