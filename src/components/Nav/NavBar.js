// NavBar.js
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from '../CartContext/CartContext';
import './navbar.css';

function NavBar() {
  const UserName = localStorage.getItem('UserName');
  const { cartCount } = useContext(CartContext);

  return (
    <Navbar expand="lg" className='modern-navbar'>
      <Navbar.Brand href='/E-Commerce-React' className='ms-3'>Trending Mart</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler-modern' />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/E-Commerce-React" className='ms-2'>Home</Nav.Link>
          <Nav.Link className='ms-2'>
            <Link to='/signup' className='nav-link-inner'>Signup</Link>
          </Nav.Link>
          <Nav.Link className='ms-2'>
            <Link to='/LogIn' className='nav-link-inner'>SignIn</Link>
          </Nav.Link>
          <Nav.Link className='ms-2'>
            <Link to='/categories' className='nav-link-inner'>Categories</Link>
          </Nav.Link>
          <Nav.Link className='ms-2'>
            <Link to='/profile' className='nav-link-inner'>
              {UserName && <span className="user-badge">{UserName}</span>}
            </Link>
          </Nav.Link>
        </Nav>
        <Button className='cart-btn me-3' href='/cart'>
          <span className='cart-badge'>{cartCount}</span>
          <FaCartPlus /> Cart
        </Button>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search products..."
            className="search-input me-2"
            aria-label="Search"
          />
          <Button className='search-btn'>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
