import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../common/NavBar';
import '../../styles/productDetail.css';
import errImg from '../../assets/404-error.jpg';
import { Carousel } from 'react-bootstrap';
import { IoWarningOutline } from 'react-icons/io5';
import { API_BASE_URL, getImageUrl } from '../../apiConfig';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const addToCart = () => {
    axios.post(`${API_BASE_URL}/addTocart/${id}`)
      .then(response => console.log('Added to cart:', response.data))
      .catch(error => console.error(error));
  };

  const sendEmailNotification = () => {
    axios.post(`${API_BASE_URL}/subscribe/${id}`, {
      productId: product.id,
      email: email,
    })
      .then(() => alert('You will be notified when the product is back in stock.'))
      .catch(error => console.error('Subscription failed:', error));
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));

    axios.get(`${API_BASE_URL}/products/suggested/${id}`)
      .then(res => setSuggestedProducts(res.data))
      .catch(err => console.error(err));

    setTimeout(() => setLoading(false), 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <NavBar />
        <div className="detail-loading">
          <div className="modern-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <NavBar />
        <div className="detail-error">
          <img src={errImg} alt="Product not found" />
        </div>
      </div>
    );
  }

  const productImages = [product.image1, product.image2, product.image3].filter(Boolean);

  return (
    <div className="product-detail-page">
      <NavBar />
      <div className="product-detail-container">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className={`detail-stock-bar ${product.stock === 0 ? 'in-stock' : 'out-of-stock'}`}>
              <span className="detail-stock-dot"></span>
              {product.stock === 0 ? 'In Stock' : 'Out of Stock'}
            </div>
            <div className="product-detail-carousel">
              <Carousel interval={2000} indicators={false} fade>
                {productImages.map((proimage, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={getImageUrl(proimage)}
                      alt={`${product.Pname} view ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="product-info-card">
              <h2>{product.Pname}</h2>
              <p className="description">{product.description}</p>
              <div className="detail-original-price">
                Original Price: &#8377;{product.originalprice}
              </div>
              <div className="detail-offer-price">
                &#8377;{product.offerprice}
              </div>

              {product.stock === 0 ? (
                <button className="btn detail-add-cart-btn" onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              ) : (
                <div className="out-of-stock-notice">
                  <span className="badge-danger">
                    <IoWarningOutline /> Out of Stock
                  </span>
                  <div className="mt-3">
                    <label>
                      <input
                        type="checkbox"
                        checked={isCheckboxChecked}
                        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                      />{' '}
                      Notify me when available
                    </label>
                  </div>
                  {isCheckboxChecked && (
                    <div className="notify-form">
                      <input
                        type="email"
                        className="form-control mb-2"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className="btn btn-success w-100" onClick={sendEmailNotification}>
                        Notify Me
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <div className="suggested-section">
            <h4>Suggested Products</h4>
            <div className="row">
              {suggestedProducts.map((sp) => (
                <div className="col-md-4 col-sm-6 mb-4" key={sp.id}>
                  <a href={`/product/${sp.id}`} className="suggested-card">
                    <div className={`detail-stock-bar ${sp.stock === 0 ? 'in-stock' : 'out-of-stock'}`} style={{ borderRadius: '12px 12px 0 0' }}>
                      <span className="detail-stock-dot"></span>
                      {sp.stock === 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                    <img src={getImageUrl(sp.image1)} alt={sp.Pname} />
                    <div className="card-body">
                      <h5>{sp.Pname}</h5>
                      <p className="text-muted small">{sp.description}</p>
                      <div className="price-row">
                        <span className="original-price">₹{sp.originalprice}</span>
                        <span className="offer-price">₹{sp.offerprice}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
