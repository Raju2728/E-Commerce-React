import React, { useState } from 'react';
import './NetBankingPage.css';
import NavBar from '../../Nav/NavBar';
import { useLocation } from 'react-router-dom';


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

    // Implement payment process with selected bank
    console.log('Payment processed with:', selectedBank);
    // You can send the payment details to the server via API here.
  };

  return (
    <div>
        <NavBar/>
    <div className="netbanking-div">
      <h2 className="text-center my-4">Net Banking Payment</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-8 col-12">
          <form onSubmit={handlePayment} className="p-4 border rounded bg-light">
            <div className="mb-3">
              <label htmlFor="bankSelect" className="form-label">Select Bank</label>
              <select
                id="bankSelect"
                className="form-select"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                required
              >
                <option value="" selected disabled>-- Select Your Bank --</option>
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
              <label htmlFor="password" className="form-label">Net Banking Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your net banking password"
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
              <label htmlFor="totalPrice" className="form-label">Total Price</label>
              <input
                type="text"
                className="form-control"
                id="totalPrice"
                value={`₹${totalPrice}`}
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NetBankingPage;
