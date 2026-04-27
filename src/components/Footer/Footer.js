// src/Components/Footer/Footer.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

const FooterPage = () => {
  return (
    <footer className="modern-footer">
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Trending Mart</h5>
            <p>
              Trending Mart offers a wide variety of trendy and stylish clothing for all occasions. Our mission is to provide quality apparel that keeps you ahead in fashion. Shop with us and experience the best in online clothing retail.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <p>
              Email: support@trendingmart.com <br />
              Phone: +91 7980437615 <br />
              Address: Trendy Mart, P.S Park, Erode, TamilNadu, India
            </p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="d-flex flex-column gap-2">
              <a href="https://facebook.com" className="footer-social-link" target='_blank' rel='noreferrer'>
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://instagram.com" className="footer-social-link" target='_blank' rel='noreferrer'>
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://x.com" className="footer-social-link" target='_blank' rel='noreferrer'>
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </Col>
        </Row>
        <div className="footer-divider">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Trending Mart. All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default FooterPage;
