import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './products.css';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { API_BASE_URL, getImageUrl } from '../../apiConfig';

const WomenProductsPage = ({ direction = 'left' }) => {
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/wproducts`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
  };

  const handleProductClick = (id) => {
    // Navigate to the product details page with the product ID
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <div className="container2">
        <h3 className="text-left mb-2 mt-2">
          <Link to="/women" className="link-body">Women's</Link>
        </h3>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} lg={2} className="mb-4" onClick={() => handleProductClick(product.id)}>
              <Card className="card">
              {product.stock === 0 ?
                (<div className='d-flex w-100 justify-content-center align-items-center rounded-top p-stock'>
                  In-Stock
                  <div className='green-dot'>
                    <div className='white-dot'>
                      <div className='inner-Gdot'></div>
                    </div>
                  </div>
                </div>):
                (<div className='d-flex w-100 justify-content-center align-items-center p-stock'>
                  Out-Of-Stock
                  <div className='red-dot'>
                    <div className='white-dot'>
                      <div className='inner-Rdot'></div>
                    </div>
                  </div>
                </div>)}
                <Card.Img 
                  variant="top" 
                  src={getImageUrl(product.image1)}
                  alt={product.Pname} 
                  className="pro-img" 
                />
                <Card.Body className="p-cont">
                  <Card.Title className="p-name">{product.Pname}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="text-muted text-decoration-line-through gap"> <strong> Original Price: <span className='text-danger'>&#8377;{product.originalprice}</span></strong>
                  </Card.Text>
                  <Card.Text className="text-dark gap"> <strong> Offer Price: <span className='text-success'>&#8377;{product.offerprice}</span></strong>
                  </Card.Text>
                  <Button variant="primary" className="adc-btn">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </motion.div>
  );
};

export default WomenProductsPage;
