import React, { useState, useEffect } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { FaUser, FaCartPlus, FaExchangeAlt } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { LuLogOut } from 'react-icons/lu';
import { MdManageHistory } from 'react-icons/md';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin.css';

const AdminNavbar = () => {
  const [userCount, setUserCount] = useState(0);
  const AdminUserName = localStorage.getItem('AdminUserName');

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/userCount`);
        setUserCount(response.data);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
    fetchCount();
  }, []);

  const handleLogout = () => {
    axios.post(`${API_BASE_URL}/Adminlogout`)
      .then(() => {
        localStorage.removeItem('AdminUserName');
        window.location.href = '/admin';
      })
      .catch(error => console.error(error));
  };

  const getInitial = () => {
    return AdminUserName ? AdminUserName.charAt(0).toUpperCase() : 'A';
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Admin Panel</span>
      </div>

      <Nav className="flex-column mt-2">
        <Nav.Link href="/admin/panel" className="active">
          Dashboard
        </Nav.Link>
        <Nav.Link href="/admin/change-password">
          <FaExchangeAlt /> Change Password
        </Nav.Link>
        <Nav.Link href="/admin/users">
          <FaUser /> Users <span className="sidebar-badge">{userCount}</span>
        </Nav.Link>
        <Nav.Link href="/admin/add">
          <FaCartPlus /> Add Items
        </Nav.Link>
        <Nav.Link href="/admin/orders">
          <CiSettings /> Manage Orders
        </Nav.Link>

        <Dropdown className="w-100">
          <Dropdown.Toggle as={Nav.Link} id="dropdown-manage">
            <MdManageHistory /> Manage Items
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/admin/items">Update Items</Dropdown.Item>
            <Dropdown.Item href="/admin/products">Product List</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">{getInitial()}</div>
        <span className="sidebar-user-name">{AdminUserName || 'Admin'}</span>
      </div>

      <Nav className="flex-column mb-2">
        <Nav.Link onClick={handleLogout} className="logout-link">
          <LuLogOut /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminNavbar;
