import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdVerified } from 'react-icons/md';
import { VscUnverified } from 'react-icons/vsc';
import AdminNavbar from './AdminNavbar';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/Users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Users</h2>
        <div className="admin-table-card">
          <div className="admin-table-scroll">
            <table className="table table-hover table-striped">
              <thead className="table-dark position-sticky top-0">
                <tr>
                  <th>S.No</th><th>Username</th><th>Email</th><th>Date of Joining</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.email}
                      {user.verified === 1 ? (
                        <abbr title="Verified User" style={{ cursor: 'pointer', color: 'var(--primary)', marginLeft: '0.3rem' }}><MdVerified /></abbr>
                      ) : (
                        <abbr title="Unverified User" style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.3rem' }}><VscUnverified /></abbr>
                      )}
                    </td>
                    <td>{user.joindate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
