// src/pages/OTPVerification.jsx
import React, { useState, useEffect } from 'react';
import { Phone, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [generatedOtp] = useState(Math.floor(100000 + Math.random() * 900000).toString());

  const navigate = useNavigate();
  const phoneNumber = localStorage.getItem('otpPhoneNumber') || '**********';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      if (enteredOtp === generatedOtp || enteredOtp === '123456') {
        alert('OTP Verified!');
        navigate('/payment');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter complete OTP');
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    alert(`New OTP sent to ${phoneNumber}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <div className="otp-header">
          <Phone className="otp-icon" />
          <h2>Verify Your Phone</h2>
          <p>We've sent a 6-digit code to <strong>{phoneNumber}</strong></p>
          <p className="demo-note">Demo OTP: {generatedOtp} or use 123456</p>
        </div>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="otp-input"
              maxLength={1}
            />
          ))}
        </div>

        <div className="otp-timer">
          {timeLeft > 0 ? (
            <p>Code expires in {formatTime(timeLeft)}</p>
          ) : (
            <p className="expired">Code expired</p>
          )}
        </div>

        <div className="otp-actions">
          <button onClick={handleVerify} className="btn btn-primary btn-full">
            Verify OTP
          </button>

          <div className="otp-resend">
            {canResend ? (
              <button onClick={handleResend} className="resend-btn">
                <RefreshCw size={16} />
                Resend Code
              </button>
            ) : (
              <p>Resend available in {formatTime(timeLeft)}</p>
            )}
          </div>

          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
