import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/auth.css';
import NavBar from '../common/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apiConfig';

const SignIn = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      if (response.status === 200) {
        navigate('/');
        localStorage.setItem('UserName', response.data.UserName);
        localStorage.setItem('UserEmail', response.data.UserEmail);
        localStorage.setItem('JoinDate', response.data.JD);
      } else {
        setMsg('Invalid Username/Password');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setMsg('Login failed. Please try again.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div className="auth-page">
      <NavBar />
      <div className="auth-content">
        <div className="auth-card">
          <h3>Sign In</h3>
          {msg && <div className="auth-error">{msg}</div>}
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="signin-email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="signin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signin-password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="signin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/forgot-password">Forgot Password?</Link>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
