import React, { useContext, useEffect } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../../Assets/empty-cart.png";
import NavBar from '../Nav/NavBar';
import './cart.css';
import { getImageUrl } from '../../apiConfig';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, [setCartItems]);

  // Save cart items to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle increment of product quantity
  const incrementQuantity = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
              totalPrice: ((item.quantity || 1) + 1) * item.offerprice
            }
          : item
      )
    );
  };

  // Handle decrement of product quantity
  const decrementQuantity = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems
        .map(item =>
          item.id === productId && (item.quantity || 1) >= 1
            ? {
                ...item,
                quantity: (item.quantity || 1) - 1,
                totalPrice: ((item.quantity || 1) - 1) * item.offerprice
              }
            : item
        )
        .filter(item => item.quantity > 0) // Automatically remove if quantity reaches 0
    );
  };

  // Handle remove product from cart
  const removeFromCart = (productId) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
  };

  // Navigate to Payment Page
  const handleOrderNow = () => {
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.totalPrice || item.offerprice), 0);
    navigate('/payment', { state: { totalPrice } });
  };

  return (
    <div className='Cart-cont'>
      <NavBar />
      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <center>
            <img src={emptyCart} alt="Empty Cart" className='empty-cart' />
          </center>
        </div>
      ) : (
        <div className="Cart-body">
          <h2 className='text-dark mb-4'>Your Cart</h2>
          
          {/* Desktop View: Table */}
          <table className="table table-bordered table-striped table-hover d-none d-md-table">
            <thead className='table-dark'>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Material</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={getImageUrl(item.image1)} alt={item.Pname} style={{ width: '50px' }} /></td>
                  <td>{item.Pname}</td>
                  <td>{item.Pcategorey}</td>
                  <td>{item.gender}</td>
                  <td>{item.material}</td>
                  <td>&#8377;{item.offerprice}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => decrementQuantity(item.id)}>-</button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                  </td>
                  <td>&#8377;{item.totalPrice || (item.offerprice * (item.quantity || 1))}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View: Column Layout */}
          <div className="cart-mobile-view d-md-none">
            {cartItems.map(item => (
              <div className="cart-item-mobile" key={item.id}>
                <img src={getImageUrl(item.image1)} alt={item.Pname} className="cart-item-image" />
                <div className="cart-item-details">
                  <h6>{item.Pname}</h6>
                  <p>Category: {item.Pcategorey}</p>
                  <p>Gender: {item.gender}</p>
                  <p>Material: {item.material}</p>
                  <p>Price: &#8377;{item.offerprice}</p>
                  <p>Total Price: &#8377;{item.totalPrice || (item.offerprice * (item.quantity || 1))}</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => decrementQuantity(item.id)}>-</button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => incrementQuantity(item.id)}>+</button>
                    <button className="btn btn-danger btn-sm ms-auto" onClick={() => removeFromCart(item.id)}>X</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="success" className="mt-3" onClick={handleOrderNow}>Order Now</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
