import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav,} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './cnavbar.css';

function Cnavbar() {
  return (
    <div className='cnavbar'>
        <marquee className='c-scroll'>
            Best collection @ Trending Mart with 25% Offer
        </marquee>
    <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='c-toggel'/>
        <Navbar.Brand href="/categories" className='text-dark ms-3'>Categories</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link className='text-light  ms-5'><Link to='/Mens'className='clink' >Men's</Link></Nav.Link>
            <Nav.Link className='text-light ms-5'><Link to='/women'className='clink' >Women's</Link></Nav.Link>
            <Nav.Link className='text-light ms-5'><Link to='/kids' className='clink' >Kids</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default Cnavbar;
