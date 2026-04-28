import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin.css';

const AdminIndex = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/adminLogin`, { email, password });
      if (response.status === 200) {
        navigate('/admin/panel');
        localStorage.setItem('AdminUserName', response.data.AdminUserName);
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
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h3 className="text-center mb-4 text-light">Admin Sign In</h3>
        {msg && <div className="auth-error">{msg}</div>}
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="admin-username" className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control"
              id="admin-username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="admin-password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
            />
          </div>
          <Button variant="primary" type="submit" className="w-100" style={{ background: 'var(--gradient-primary)', border: 'none' }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminIndex;
