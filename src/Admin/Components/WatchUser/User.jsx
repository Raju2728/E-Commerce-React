import React, { useEffect, useState } from 'react'
import AdminNavBar from '../AdminNavbar/AdminNavbar'
import './user.css'
import axios from 'axios'
import { MdVerified } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

const User = () => {
  const [users, setUsers] = useState([]);
  const [verified , setVerified] = useState('')
  useEffect(() => {
      axios.get('http://localhost:7230/Users')
          .then(response => {
              setUsers(response.data);
              console.log(response.data)
          })
          .catch(error => {
              console.error("There was an error fetching the data!", error);
          });
  }, []);

  return (
    <div className='adminpannel'>
        <AdminNavBar/>
        <div className='admin-User'>
          <h1 className='text-light mb-5'>Users</h1>
            <table className="table table-hover table-secondary">
                <thead className="table-dark">
                    <tr>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Date of Joining</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>
                              {user.email}
                              {user.email_flag==1 && <abbr title="Verified User" style={{cursor:'pointer'}}><MdVerified/></abbr> }
                            </td>
                            
                            <td>{user.joindate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    </div>
  )
}

export default User