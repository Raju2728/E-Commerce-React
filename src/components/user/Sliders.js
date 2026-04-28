import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import slideImg from '../../assets/slider1_2.jpg';
import '../../styles/slider.css';

function Sliders() {
  return (
    <>
      <Carousel className="hero-slider" interval={5000} fade>
        <Carousel.Item>
          <img src={slideImg} alt="Fashion collection" className="slider-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">
              Style That <span>Speaks</span>
            </h1>
            <p className="hero-subtitle">
              Discover premium fashion for men, women & kids — curated for every occasion
            </p>
            <Link to="/categories" className="hero-cta">
              Shop Now <FiArrowRight />
            </Link>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slideImg} alt="Trending styles" className="slider-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">
              New <span>Arrivals</span>
            </h1>
            <p className="hero-subtitle">
              Fresh styles dropping weekly — be the first to wear what&apos;s next
            </p>
            <Link to="/categories" className="hero-cta">
              Explore <FiArrowRight />
            </Link>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slideImg} alt="Premium quality" className="slider-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">
              Upto <span>25% Off</span>
            </h1>
            <p className="hero-subtitle">
              Premium quality clothing at unbeatable prices — shop the sale now
            </p>
            <Link to="/categories" className="hero-cta">
              View Deals <FiArrowRight />
            </Link>
          </div>
        </Carousel.Item>
      </Carousel>

      <div className="feature-strip">
        <div className="feature-item">
          <div className="feature-icon"><FiTruck /></div>
          Free Shipping
        </div>
        <div className="feature-item">
          <div className="feature-icon"><FiShield /></div>
          Secure Payments
        </div>
        <div className="feature-item">
          <div className="feature-icon"><FiRefreshCw /></div>
          Easy Returns
        </div>
      </div>
    </>
  );
}

export default Sliders;
