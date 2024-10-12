import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Nav/NavBar'
import { Button } from 'react-bootstrap';
import './profile.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const [orderHistory, setOrderHistory] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const UserName = localStorage.getItem('UserName');
    const UserEmail = localStorage.getItem('UserEmail');
    const JoinDate = localStorage.getItem('JoinDate');

    useEffect(() => {
        // Fetch user data
        axios.get('/api/user/profile')
            .then(response => {
                setUserData(response.data);
                console.log(userData)
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        // Fetch order history
        axios.get('/api/user/orders')
            .then(response => {
                setOrderHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching order history:', error);
            });

        // Fetch saved items
        axios.get('/api/user/saved-items')
            .then(response => {
                setSavedItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching saved items:', error);
            });
    });

    const handleLogout = () => {
        axios.post('http://localhost:7230/logout')
         .then((response) => {
            console.log(response);
            localStorage.removeItem('UserName');
            window.location.href = '/E-Commerce-React';
          })
         .catch((error) => {
            console.log(error);
          });
        }

    return (
        <div>
            <NavBar/>
        
        <div className="cont">
            <div className="row">
                <div className="col-md-4">
                    <div className="pro-card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Profile Information</h5>
                            <div className='User-Profile'></div>
                            <p><strong>Name:</strong> {UserName && <span>{UserName}</span>}</p>
                            <p><strong>Email:</strong> {UserEmail && <span>{UserEmail}</span>} </p>
                            <p><strong>Joined:</strong> {JoinDate && <span>{JoinDate}</span>} </p>
                            <Button onClick={handleLogout} style={{margin:'.5rem'}} className='mt-3'>Logout</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="ord-card">
                        <div className="card-body">
                            <h5 className="card-title">Order History</h5>
                            {orderHistory.length > 0 ? (
                                <ul className="list-group">
                                    {orderHistory.map(order => (
                                        <li key={order.id} className="list-group-item">
                                            Order #{order.id} - {order.status} - {new Date(order.date).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                    <div className="save-card mt-5">
                        <div className="card-body">
                            <h5 className="card-title">Saved Items</h5>
                            {savedItems.length > 0 ? (
                                <div className="row">
                                    {savedItems.map(item => (
                                        <div key={item.id} className="col-md-4 mb-3">
                                            <div className="card">
                                                <img src={item.image} className="card-img-top" alt={item.name} />
                                                <div className="card-body">
                                                    <h6 className="card-title">{item.name}</h6>
                                                    <p className="card-text">${item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No saved items found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;
