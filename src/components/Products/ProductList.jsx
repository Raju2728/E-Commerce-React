/**
 * ProductList Component
 * 
 * Example component demonstrating proper API integration with:
 * - Loading state
 * - Error handling
 * - Centralized API configuration
 * 
 * @component
 * @example
 * import ProductList from './Components/Products/ProductList';
 * 
 * // Use in your route:
 * <Route path="/products" element={<ProductList />} />
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../apiConfig';
import './products.css';

const ProductList = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products from the API
   * Uses try/catch for proper error handling
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle product click - navigate to product details
   */
  const handleProductClick = (productId) => {
    // Navigate to product details page
    // Assuming you have react-router-dom set up
    window.location.href = `/product/${productId}`;
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className="container text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading products...</p>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Products</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={fetchProducts}>
              Try Again
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  /**
   * Render empty state
   */
  if (products.length === 0) {
    return (
      <div className="container py-5">
        <Alert variant="info">
          <Alert.Heading>No Products Found</Alert.Heading>
          <p>There are no products available at the moment.</p>
        </Alert>
      </div>
    );
  }

  /**
   * Render product grid
   */
  return (
    <div className="container py-4">
      <h2 className="mb-4">All Products</h2>
      
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id || product.Pname}>
            <Card className="h-100 product-card">
              {/* Product Image */}
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={getImageUrl(product.image1)}
                  alt={product.Pname || product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
              </div>

              <Card.Body>
                <Card.Title className="product-name">
                  {product.Pname || product.name}
                </Card.Title>
                
                <Card.Text className="product-description">
                  {product.description?.substring(0, 100) || 'No description available'}
                  {(product.description?.length > 100) && '...'}
                </Card.Text>

                {/* Price Display */}
                <div className="price-container">
                  {product.offerprice ? (
                    <>
                      <span className="original-price">${product.originalprice}</span>
                      <span className="offer-price">${product.offerprice}</span>
                    </>
                  ) : (
                    <span className="price">${product.price || 'N/A'}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleProductClick(product.id)}
                    className="flex-grow-1"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    as={Link}
                    to={`/product/${product.id}`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;