import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Nav/NavBar';
import './productdisplay.css';
import errImg from '../../Assets/404-error.jpg';
import { Carousel, Card } from 'react-bootstrap';
import { IoWarningOutline } from "react-icons/io5";
import { API_BASE_URL, getImageUrl } from '../../apiConfig';

const ProductTry = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [cartCount, setCartCount] = useState(0);
    const [email, setEmail] = useState('');

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    // Function to handle adding product to cart
    const addToCart = () => {
        axios.post(`${API_BASE_URL}/addTocart/${id}`)
            .then(response => {
                setCartCount(response.data); // Update the cart count
                // console.log(response.data)
            })
            .catch(error => console.error(error));
    };

    const sendEmailNotification = () => {
        axios.post(`${API_BASE_URL}/subscribe/${id}`, {
            productId: product.id, // Replace `id` with the product ID variable
            email: email   // Replace `email` with the state storing the user's email
        })
        .then(response => {
            alert('You will be notified when the product is back in stock.');
        })
        .catch(error => {
            console.error('Subscription failed:', error);
        });
        // axios.post('http://localhost:7230/sendEmail', {
        //     email: email,
        //     productName: product.Pname,
        // })
        // .then((response) => {
        //     console.log('Email sent successfully:', response.data);
        // })
        // .catch((error) => {
        //     console.error('Error sending email:', error);
        // });
    };

    useEffect(() => {
        // Fetch product details
        axios.get(`${API_BASE_URL}/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));

        // Fetch suggested products
        axios.get(`${API_BASE_URL}/products/suggested/${id}`)
            .then(res => setSuggestedProducts(res.data))
            .catch(err => console.error(err));

        setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Change Background Color based on product gender
        const bgColor = () => {
            const productElement = document.getElementById('productdisplay');
            if (product && product.gender === 'Female' && productElement) {
                productElement.style.backgroundColor = 'pink';
            } else if (product && product.gender === 'Kids' && productElement) {
                productElement.style.backgroundColor = 'skyblue';
            } else if (product && product.gender === 'Male' && productElement) {
                productElement.style.backgroundColor = '#6fa8dc';
            }
        };

        bgColor();

    }, [id, product]);
    // Handel CheckChange
    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };


    // If loading, show spinner
    if (loading) {
        return (
            <div>
                <NavBar cartCount={cartCount} />
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Please Wait....</p>
                </div>
            </div>
        );
    }

    // If product is not found, show error image
    if (!product) {
        return (
            <div className="text-center">
                <NavBar cartCount={cartCount} />
                <img src={errImg} alt="Product Not Found" className='errimg' />
            </div>
        );
    }

     // If product is not found, show error image
    //  if (product.stock === "Out-Of-Stock") {
    //     return (
    //         <div className="text-center">
    //             <NavBar cartCount={cartCount} />
    //             <img src={errImg} alt="Product Not Found" className='errimg' />
    //         </div>
    //     );
    // }

    // Convert images to an array
    const productImages = [product.image1, product.image2, product.image3].filter(Boolean);

    return (
        <div className="productdisplay" id='productdisplay'>
            <NavBar cartCount={cartCount} />
            <div className="Product-detail">
                <div className="row">
                    <div className="col-lg-6 col-md-8 mx-auto">
                    {product.stock === 0 ?
                (<div className='bg-secondary text-light d-flex w-100 justify-content-center align-items-center rounded-top p-stock'>
                  In-Stock
                  <div className='green-dot'>
                    <div className='white-dot'>
                      <div className='inner-Gdot'></div>
                    </div>
                  </div>
                </div>):
                (<div className='bg-secondary text-light d-flex w-100 justify-content-center align-items-center rounded-top p-stock'>
                  Out-Of-Stock
                  <div className='red-dot'>
                    <div className='white-dot'>
                      <div className='inner-Rdot'></div>
                    </div>
                  </div>
                </div>)}
                        <Carousel interval={2000} indicators={false} fade>
                            {productImages.map((proimage, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100 img"
                                        src={getImageUrl(proimage)}
                                        alt={`Product Image ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        {/* Product Details */}
                        <div className="mt-4 text-center">
                            <h2>{product.Pname}</h2>
                            <p>{product.description}</p>
                            <h5 className="text-muted text-decoration-line-through">
                                Original Price: <span className='text-danger'>&#8377;{product.originalprice}</span>
                            </h5>
                            <h3>Offer Price: <span className="text-success">&#8377;{product.offerprice}</span></h3>
                            {product.stock === 0 ?
                            (
                                <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to Cart</button>
                            ) :
                            (
                                <div>
                                        <input 
                                            type="checkbox" 
                                            id="notify-checkbox" 
                                            checked={isCheckboxChecked} 
                                            onChange={handleCheckboxChange} 
                                        />
                                        <label htmlFor="notify-checkbox"> Notify Me</label><br />
                                        {isCheckboxChecked && (
                                            
                                            <div className="row mb-3">
                                        <div className="col-12 col-md-8 mx-auto">
                                            <input
                                                type="email"
                                                className="form-control mb-2"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{ borderRadius: '5px' }}
                                            />
                                        </div>
                                        <div className="col-12 col-md-4 mx-auto text-center">
                                            <button
                                                className="btn btn-success w-100"
                                                onClick={sendEmailNotification}
                                                style={{ borderRadius: '5px' }}
                                            >
                                                Submit Response
                                            </button>
                                        </div>
                                    </div>
                                        )}
                                        <span className='bg-danger p-1 mt-3 outofstock'>
                                            <IoWarningOutline /> This Product Is Out Of Stock
                                        </span><br />
                                    </div>
                            )}
                            
                        </div>
                    </div>
                </div>
                {/* Suggested Products */}
                <div className="row mt-5">
                    <h4>Suggested Products</h4>
                    {suggestedProducts.map((suggestedProduct) => (
                        <div className="col-md-4 my-4 suggestedPro" key={suggestedProduct.id}>
                            <a href={`/product/${suggestedProduct.id}`} style={{ textDecoration: "none" }}>
                                <Card className="s-card">
                                {suggestedProduct.stock === 0 ?
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
                                    <img
                                        className="card-img-top s-img"
                                        src={getImageUrl(suggestedProduct.image1)}
                                        alt={suggestedProduct.Pname}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{suggestedProduct.Pname}</h5>
                                        <p>{suggestedProduct.description}</p>
                                        <h5 className="text-muted text-decoration-line-through">
                                            Original Price: <span className='text-danger'>&#8377;{suggestedProduct.originalprice}</span>
                                        </h5>
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
