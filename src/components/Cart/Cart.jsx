import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/payment');
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Original Price</th>
              <th scope="col">Offer Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td><img src={item.image} alt={item.name} style={{ width: '50px' }} /></td>
                <td>{item.name}</td>
                <td>${item.originalPrice}</td>
                <td>${item.offerPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <button className="btn btn-primary mt-3" onClick={handleOrderClick}>
          Order
        </button>
      )}
    </div>
  );
};

export default Cart;
