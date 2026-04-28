import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = () => {
      axios.get(`${API_BASE_URL}/cart`)
        .then(response => {
          setCartItems(response.data.cart || []);
        })
        .catch(error => console.error(error));
    };
    fetchCart();
  }, []);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
