import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../common/NavBar';
import { Button } from 'react-bootstrap';
import '../../styles/profile.css';
import { API_BASE_URL } from '../../apiConfig';

const ProfilePage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const UserName = localStorage.getItem('UserName');
  const UserEmail = localStorage.getItem('UserEmail');
  const JoinDate = localStorage.getItem('JoinDate');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/user/orders`)
      .then(response => setOrderHistory(response.data))
      .catch(error => console.error('Error fetching order history:', error));

    axios.get(`${API_BASE_URL}/api/user/saved-items`)
      .then(response => setSavedItems(response.data))
      .catch(error => console.error('Error fetching saved items:', error));
  }, []);

  const handleLogout = () => {
    axios.post(`${API_BASE_URL}/logout`)
      .then(() => {
        localStorage.removeItem('UserName');
        localStorage.removeItem('UserEmail');
        localStorage.removeItem('JoinDate');
        window.location.href = '/';
      })
      .catch(error => console.error(error));
  };

  const getInitial = () => {
    return UserName ? UserName.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-container">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-card">
              <h5>Profile Information</h5>
              <div className="profile-avatar">{getInitial()}</div>
              <div className="profile-info">
                <p><strong>Name:</strong> {UserName || 'Not logged in'}</p>
                <p><strong>Email:</strong> {UserEmail || '—'}</p>
                <p><strong>Joined:</strong> {JoinDate || '—'}</p>
              </div>
              <Button className="profile-logout-btn mt-3" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="order-card">
              <h5>Order History</h5>
              {orderHistory.length > 0 ? (
                <ul className="list-group">
                  {orderHistory.map(order => (
                    <li key={order.id} className="list-group-item">
                      Order #{order.id} - {order.status} - {new Date(order.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No orders found.</p>
              )}
            </div>
            <div className="saved-card">
              <h5>Saved Items</h5>
              {savedItems.length > 0 ? (
                <div className="row">
                  {savedItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-3">
                      <div className="card">
                        <img src={item.image} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                          <h6 className="card-title">{item.name}</h6>
                          <p className="card-text">₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No saved items found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
