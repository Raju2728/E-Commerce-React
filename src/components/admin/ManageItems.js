import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin.css';

const ManageItems = () => {
  const [Pname, setPname] = useState('');
  const [originalprice, setOriginalprice] = useState('');
  const [offerprice, setOfferprice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/ManageItems`, { Pname, stock, originalprice, offerprice });
      if (response.status === 201) {
        setMessage('Product updated successfully.');
        setMessageType('success');
      } else {
        setMessage(response.data.message);
        setMessageType('danger');
      }
    } catch (error) {
      setMessage('An error occurred while updating.');
      setMessageType('danger');
    }
  };

  return (
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Update Items</h2>
        <div className="admin-form-card">
          {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>{message}</Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setPname(e.target.value)} required />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Original Price</label>
                <input type="text" className="form-control" placeholder="Original Price" onChange={(e) => setOriginalprice(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Offer Price</label>
                <input type="text" className="form-control" placeholder="Offer Price" onChange={(e) => setOfferprice(e.target.value)} required />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Stock</label>
              <select className="form-select" onChange={(e) => setStock(e.target.value)} required>
                <option value="" disabled>Select Stock Status</option>
                <option value="0">In Stock</option>
                <option value="1">Out of Stock</option>
              </select>
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-success" type="submit">Update Items</button>
              <button type="reset" className="btn btn-outline-secondary">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
