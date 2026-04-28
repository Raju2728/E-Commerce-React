import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/auth.css';
import NavBar from '../common/NavBar';
import { API_BASE_URL } from '../../apiConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      setMessageType('danger');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/Forgotpass`, { email, newPassword });
      if (response.status === 201) {
        setMessage('Password changed successfully.');
        setMessageType('success');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(response.data.message);
        setMessageType('danger');
      }
    } catch (error) {
      setMessage('An error occurred while changing the password.');
      setMessageType('danger');
    }
  };

  return (
    <div className="auth-page">
      <NavBar />
      <div className="auth-content">
        <div className="auth-card">
          <h2>Change Password</h2>
          {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fpEmail" className="mb-3">
              <Form.Label>Email ID</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="fpNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="fpConfirmPassword" className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Change Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
