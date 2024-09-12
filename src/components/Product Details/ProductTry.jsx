import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Nav/NavBar';
import './productdisplay.css'
import errImg from '../../Assets/404-error.jpg'
import { Carousel,Card } from 'react-bootstrap';
const ProductTry = ({addToCart}) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product details
        axios.get(`http://localhost:7230/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));

        // Fetch suggested products
        axios.get(`http://localhost:7230/products/suggested/${id}`)
            .then(res => setSuggestedProducts(res.data))
            .catch(err => console.error(err));


            setTimeout(() => {
              setLoading(false); 
            }, 1000)
      
              // Change Background Color when product data is loaded
              const bgColor = () => {
                const productElement = document.getElementById('productdisplay');
                if (product && product.gender === 'Female' && productElement) {
                  productElement.style.backgroundColor = 'pink';
                }
                else if(product && product.gender === 'Kids' && productElement){
                  productElement.style.backgroundColor = 'skyblue';
                }
                else if(product && product.gender === 'Male' && productElement){
                  productElement.style.backgroundColor = '#6fa8dc';
                }
              };
      
              bgColor();
           
    }, [id , product]);

      if (loading) {
        return (
          <div>
            <NavBar />
        <div className="loading-container">
          <div className="spinner"></div>
              <p>Please Wait....</p>
        </div>
        </div>
      )}

    if (!product) {
        return  <div className="text-center">
          <NavBar/>
          <img src={errImg} alt="Product Not Found" className='errimg'/>
          </div>;
      }

    // Convert `image1` to an array if it is a comma-separated string
    const productImages = [product.image1, product.image2, product.image3].filter(Boolean); 
    
    return (
        <div className="productdisplay" id='productdisplay' >
            <NavBar/>
        <div className="Product-detail">
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          {/* Product Image Carousel */}
          <Carousel interval={2000} indicators={false} fade>
          {productImages.map((proimage, index) => (
              <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100 img"
                                        src={`http://localhost:7230/uploads/${proimage}`}
                                        alt={`Product Image ${index + 1}`}
                                    />
              </Carousel.Item>
            ))}
          </Carousel>
          
          {/* Product Details */}
          <div className="mt-4 text-center">
            <h2>{product.Pname}</h2>
            <p>{product.description}</p>
            <h5 className="text-muted text-decoration-line-through">Original Price: <span className='text-danger'>&#8377;{product.originalprice}</span></h5>
            <h3>Offer Price: <span className="text-success">&#8377;{product.offerprice}</span></h3>
            <button className="btn btn-primary" onClick={()=>addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
                <h4>Suggested Products</h4 >
                {suggestedProducts.map((suggestedProduct) => (
        <div className="col-md-4 my-4 suggestedPro" key={suggestedProduct.id}>
          <a href={`/product/${suggestedProduct.id}`} style={{ textDecoration: "none"}}>
            <Card className="s-card">
              <img
                className="card-img-top s-img"
                src={`http://localhost:7230/uploads/${suggestedProduct.image1}`}
                alt={suggestedProduct.Pname}
              />
              <div className="card-body">
                <h5 className="card-title">{suggestedProduct.Pname}</h5>
                <p>{suggestedProduct.description}</p>
                <h5 className="text-muted text-decoration-line-through">Original Price: <span className='text-danger'> &#8377;{suggestedProduct.originalprice}</span></h5>
                <h5>Offer Price: <span className="text-success">&#8377;{suggestedProduct.offerprice}</span></h5>
              </div>
            </Card>
          </a>
        </div>
        ))}
    </div>
    </div>
    </div>
    );
};

export default ProductTry;
