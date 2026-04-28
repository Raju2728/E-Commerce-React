import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { CartContext } from '../user/CartContext';
import '../../styles/navbar.css';

function NavBar() {
  const UserName = localStorage.getItem('UserName');
  const { cartCount } = useContext(CartContext);

  return (
    <Navbar expand="lg" className="modern-navbar">
      <Navbar.Brand as={Link} to="/" className="ms-3">
        Trending Mart
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" className="navbar-toggler-modern" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="ms-2">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/signup" className="ms-2">
            Signup
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="ms-2">
            SignIn
          </Nav.Link>
          <Nav.Link as={Link} to="/categories" className="ms-2">
            Categories
          </Nav.Link>
          {UserName && (
            <Nav.Link as={Link} to="/profile" className="ms-2">
              <span className="user-badge">{UserName}</span>
            </Nav.Link>
          )}
        </Nav>
        <Button className="cart-btn me-3" as={Link} to="/cart">
          <span className="cart-badge">{cartCount}</span>
          <FaCartPlus /> Cart
        </Button>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search products..."
            className="search-input me-2"
            aria-label="Search"
          />
          <Button className="search-btn">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
