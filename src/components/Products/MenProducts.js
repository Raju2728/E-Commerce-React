import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './products.css';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { API_BASE_URL, getImageUrl } from '../../apiConfig';

const MenProductsPage = ({ direction = 'left' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, x: direction === 'left' ? -60 : 60 },
    visible: { opacity: 1, x: 0 },
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="product-section men">
        <Link to="/Mens" className="product-section-title">
          Men's Collection →
        </Link>

        {loading && (
          <div className="products-loading">
            <div className="modern-spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="products-error">
            <p>⚠️ {error}</p>
            <Button className="retry-btn" onClick={fetchProducts}>Try Again</Button>
          </div>
        )}

        {!loading && !error && (
          <Row xs={2} sm={2} md={3} lg={4} xl={6}>
            {products.map((product) => (
              <Col key={product.id} className="product-card-wrapper" onClick={() => handleProductClick(product.id)}>
                <Card className="product-card">
                  <div className="product-img-wrapper">
                    <span className={`stock-badge ${product.stock === 0 ? 'in-stock' : 'out-of-stock'}`}>
                      <span className="stock-dot"></span>
                      {product.stock === 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <Card.Img
                      variant="top"
                      src={getImageUrl(product.image1)}
                      alt={product.Pname}
                      className="product-card-img"
                    />
                  </div>
                  <Card.Body className="product-card-body">
                    <div className="product-card-name">{product.Pname}</div>
                    <div className="product-card-desc">{product.description}</div>
                    <div className="price-row">
                      <span className="original-price">₹{product.originalprice}</span>
                      <span className="offer-price">₹{product.offerprice}</span>
                    </div>
                    <Button className="add-cart-btn">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </motion.div>
  );
};

export default MenProductsPage;
