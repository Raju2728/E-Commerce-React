import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emptyCartImg from '../../assets/empty-cart.png';
import NavBar from '../common/NavBar';
import '../../styles/cart.css';
import { getImageUrl } from '../../apiConfig';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const incrementQuantity = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1, totalPrice: ((item.quantity || 1) + 1) * item.offerprice }
          : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems
        .map(item =>
          item.id === productId && (item.quantity || 1) >= 1
            ? { ...item, quantity: (item.quantity || 1) - 1, totalPrice: ((item.quantity || 1) - 1) * item.offerprice }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
  };

  const handleOrderNow = () => {
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.totalPrice || item.offerprice), 0);
    navigate('/payment', { state: { totalPrice } });
  };

  return (
    <div className="cart-cont">
      <NavBar />
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img src={emptyCartImg} alt="Empty Cart" />
          <p className="empty-cart-text">Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-body">
          <h2 className="mb-4">Your Cart</h2>
          <table className="table table-bordered table-striped table-hover d-none d-md-table">
            <thead className="table-dark">
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
                  <p>Total: &#8377;{item.totalPrice || (item.offerprice * (item.quantity || 1))}</p>
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
