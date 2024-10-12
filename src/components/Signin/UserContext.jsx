// UserContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in on initial load
        const userData = localStorage.getItem('user');
        if (userData) {
            setIsLoggedIn(true);
        }
    }, []);

    // Log in function
    const logIn = (userDetails) => {
        // Store user details in local storage
        localStorage.setItem('user', JSON.stringify(userDetails));
        setIsLoggedIn(true);
    };
    
    // Log out function
    const logOut = () => {
        // Remove user details from local storage
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
};
