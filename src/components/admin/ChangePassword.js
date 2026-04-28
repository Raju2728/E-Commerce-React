import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
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
      const response = await axios.post(`${API_BASE_URL}/adminChangepass`, { currentPassword, newPassword });
      if (response.status === 201) {
        setMessage('Password changed successfully.');
        setMessageType('success');
        setCurrentPassword('');
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
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Change Password</h2>
        <div className="admin-form-card">
          {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cpCurrent" className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="cpNew" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="cpConfirm" className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Change Password</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
