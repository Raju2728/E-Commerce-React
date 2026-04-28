import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/categories.css';

function CategoryNav() {
  return (
    <div className="category-nav">
      <div className="promo-banner">
        <span>🔥 Best collection @ Trending Mart with 25% Offer — Shop Now!</span>
      </div>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="category-nav" className="c-toggel" />
        <Navbar.Brand as={Link} to="/categories" className="ms-3">
          Categories
        </Navbar.Brand>
        <Navbar.Collapse id="category-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/mens" className="ms-4">
              <span className="category-link">Men&apos;s</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/women" className="ms-4">
              <span className="category-link">Women&apos;s</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/kids" className="ms-4">
              <span className="category-link">Kids</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CategoryNav;
