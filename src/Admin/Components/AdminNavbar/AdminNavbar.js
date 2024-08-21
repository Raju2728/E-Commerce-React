import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import './adminnavbar.css'; // Optional: for custom styling
import { FaCartPlus } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { FaExchangeAlt } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import axios from 'axios';
const handleLogout = () => {
  axios.post('http://localhost:7230/Adminlogout')
   .then((response) => {
      console.log(response);
      localStorage.removeItem('AdminUserName');
      window.location.href = '/Admin';
    })
   .catch((error) => {
      console.log(error);
    });
  }

const AdminNavBar = () => {
  const [userCount, setUserCount] = useState();
  const AdminUserName = localStorage.getItem('AdminUserName');

  useEffect(() => {
    // Fetch user count from your backend API
    const fetchCount=async()=>{
      try{
        const response= await axios.get('http://localhost:7230/userCount') // Replace with your API endpoint
        setUserCount(response.data)
        // console.log(response.data);
        // console.log({userCount});
      }
      catch(error)
      {
        console.error('Error fetching user count:', error);
      }
    }
   fetchCount();
  }, []);

  return (
    <div className='Admin-Nbar'>
    <div className="d-flex">
      <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar" style={{height:'100vh'}}>
        <div className="sidebar-sticky">
          <Nav.Item className='mb-4 mt-4'>
            <Nav.Link href="/AdminPannel" className='text-dark bg-info'>
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mb-3 bg-secondary'>
            <Nav.Link href="/changepassword" className="text-light ps-5">
            <FaExchangeAlt/> Change Password
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mb-3 bg-secondary'>
            <Nav.Link href="/WatchUsers" className="text-light ps-5">
              <FaUser /> Users <span className="badge bg-success">{userCount}</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mb-3 bg-secondary'>
            <Nav.Link href="/AddItems" className="text-light ps-5">
            <FaCartPlus /> Add Items
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mb-3 bg-secondary'>
            <Nav.Link href="/ManageOrders" className="text-light ps-5">
            <CiSettings /> Manage Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mb-5 bg-secondary'>
            <Nav.Link href='/ManageItems' className="text-light ps-5">
             <MdManageHistory/> Manage Items
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='bg-secondary' style={{marginTop:"17.8rem"}}>
            <Nav.Link className='text-light d-flex'>
              <div className='Admin-profile'></div>
              {AdminUserName && <span className="Admin-name">{AdminUserName}</span>}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='mb-3 bg-success' style={{marginTop:".4rem"}}>
            <Nav.Link onClick={handleLogout} className="text-light ps-5">
            <LuLogOut/> Logout
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        {/* Main content goes here */}
      </main>
    </div>
    </div>
  );
};

export default AdminNavBar;
