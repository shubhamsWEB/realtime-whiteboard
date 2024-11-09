'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [loggerData, setLoggerData] = useState(null); // Initially null
    
    useEffect(() => {
        // Check if running on the client side
        if (typeof window !== 'undefined') {
            const prevData = localStorage.getItem('userInfo');
            const parsedData = prevData ? JSON.parse(prevData) : null;
            setLoggerData(parsedData);
        }
    }, []); // Runs only once when the component mounts

    const [user, setUser] = useState(null); // Initial user state is null

    // Any functions to get or update user data can be defined here
    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, loggerData }}>
            <ToastContainer />
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the UserContext
export const useUserContext = () => useContext(UserContext);
