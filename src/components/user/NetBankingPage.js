import React, { useState } from 'react';
import NavBar from '../common/NavBar';
import { useLocation } from 'react-router-dom';
import '../../styles/payment.css';

const NetBankingPage = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedBank || !accountNumber || !password) {
      setError('Please fill all fields');
      return;
    }
    console.log('Payment processed with:', selectedBank);
  };

  return (
    <div>
      <NavBar />
      <div className="netbanking-page">
        <h2 className="text-center my-4">Net Banking Payment</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label htmlFor="bankSelect" className="form-label">Select Bank</label>
            <select
              id="bankSelect"
              className="form-select"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              required
            >
              <option value="" disabled>-- Select Your Bank --</option>
              {banks.map((bank, index) => (
                <option key={index} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="accountNumber" className="form-label">Account Number</label>
            <input
              type="text"
              className="form-control"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              placeholder="Enter your account number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nbPassword" className="form-label">Net Banking Password</label>
            <input
              type="password"
              className="form-control"
              id="nbPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your net banking password"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label htmlFor="totalPrice" className="form-label">Total Price</label>
            <input type="text" className="form-control" id="totalPrice" value={`₹${totalPrice}`} readOnly />
          </div>
          <button type="submit" className="btn btn-primary w-100">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default NetBankingPage;
