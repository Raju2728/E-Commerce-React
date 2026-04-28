import React, { useState } from 'react';
import NavBar from '../common/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/auth.css';

const Verified = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({ otp: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/verify`, otp)
      .then(() => {
        alert('Verification Successful');
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  };

  return (
    <div className="auth-page">
      <NavBar />
      <div className="auth-content">
        <div className="auth-card">
          <h2>Verification</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                autoComplete="off"
                placeholder="Enter The OTP"
                onChange={handleChange}
                value={otp.otp}
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verified;
