import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = () => {
      axios.get('http://localhost:7230/cart')
        .then(response => {
          setCartItems(response.data.cart || []); // Ensure cart is an array, even if empty
        })
        .catch(error => console.error(error));
    };
    fetchCart();
  }, []);

  // Calculate the cart count
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
