import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const logIn = (userDetails) => {
    localStorage.setItem('user', JSON.stringify(userDetails));
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
