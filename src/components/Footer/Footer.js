// src/FooterPage.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

const FooterPage = () => {
  return (
    <footer className="footer mt-5 py-4 text-dark">
        <Row>
          <Col md={4}>
            <h5>Trending Mart</h5>
            <p>
              Trending Mart offers a wide variety of trendy and stylish clothing for all occasions. Our mission is to provide quality apparel that keeps you ahead in fashion. Shop with us and experience the best in online clothing retail.
            </p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              Email: support@trendingmart.com <br />
              Phone: +91 7980437615 <br />
              Address: Trendy Mart , P.S Park , Erode ,TamilNadu , India
            </p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>
              <a href="facebook.com" className="text-black me-2" target='_blank'><i className="fab fa-facebook" ></i> Facebook</a> <br />
              <a href="instagram.com" className="text-black me-2" target='_blank'><i className="fab fa-instagram"></i> Instagram</a> <br />
              <a href="X.com" className="text-black me-2" target='_blank'><i className="fab fa-twitter"></i> Twitter</a> <br />
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Trending Mart. All Rights Reserved.</p>
          </Col>
        </Row>
    </footer>
  );
};

export default FooterPage;
