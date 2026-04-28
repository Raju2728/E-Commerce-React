import React from 'react';
import AdminNavbar from './AdminNavbar';
import '../../styles/admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Dashboard</h2>
        <p className="text-muted">Welcome to the Admin Panel. Select an option from the sidebar.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
