import React, { useState } from 'react';
import { CreditCard, Wallet, ArrowLeft, Smartphone, Banknote } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const handleAddMoney = (e) => {
    e.preventDefault();
    if (!user || !amount) return;
    setLoading(true);

    setTimeout(() => {
      if (paymentMethod === 'cod') {
        alert(`Cash on Delivery selected. Your payment of ₹${amount} will be collected at delivery.`);
      } else {
        const newWalletAmount = user.wallet + parseInt(amount);
        setUser({ ...user, wallet: newWalletAmount });
        alert(`₹${amount} added to your wallet successfully!`);
      }

      setLoading(false);
      setAmount('');

      // Add slight delay after alert before navigating
      setTimeout(() => {
        navigate('/');
      }, 300);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        <div className="payment-card">
          {/* Header */}
          <div className="payment-header">
            <button onClick={() => navigate(-1)} className="backBtn">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="pageTitle">Payment</h1>
          </div>

          {/* Wallet Balance */}
          <div className="balanceCard">
            <div className="balance-top">
              <div>
                <p className="balance-sub">Current Balance</p>
                <p className="balance-amount">₹{user?.wallet || 0}</p>
              </div>
              <Wallet className="walletIcon" />
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleAddMoney} className="payment-form">
            {/* Amount Input */}
            <div>
              <label className="label">Enter Amount</label>
              <div className="inputWrapper">
                <span className="currencyPrefix">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="10"
                  max="50000"
                  required
                  className="input"
                />
              </div>
              <p className="hint">Min: ₹10, Max: ₹50,000</p>
            </div>

            {/* Payment Methods */}
            <div className="method-section">
              <label className="label center">Choose Payment Method</label>
              <div className="methods">
                <label className="method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Smartphone className="methodIcon" />
                  <span>UPI / Wallet (PhonePe, Paytm, GPay)</span>
                </label>

                <label className="method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <CreditCard className="methodIcon" />
                  <span>Credit / Debit Card</span>
                </label>

                <label className="method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Banknote className="methodIcon" />
                  <span>Net Banking</span>
                </label>

                <label className="method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Banknote className="methodIcon" />
                  <span>Cash Delivery</span>
                </label>
              </div>
            </div>

            {/* Security Note */}
            <div className="noteBox">
              <h4 className="noteTitle">🔒 Secure Payment</h4>
              <p className="noteText">
                Your details are protected and never stored. We use encrypted gateways for all transactions.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submitBtn"
              disabled={loading || !amount || parseInt(amount) < 10}
            >
              {loading ? 'Processing...' : `Pay ₹${amount || 0}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
