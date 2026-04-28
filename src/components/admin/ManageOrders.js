import React from 'react';
import AdminNavbar from './AdminNavbar';
import '../../styles/admin.css';

const ManageOrders = () => {
  return (
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Manage Orders</h2>
        <p className="text-muted">Order management coming soon.</p>
      </div>
    </div>
  );
};

export default ManageOrders;
