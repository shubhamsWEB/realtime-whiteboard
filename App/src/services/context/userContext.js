'use client'
import React, { createContext, useState, useContext } from 'react';
import { ToastContainer } from "react-toastify";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const prevData = localStorage.getItem('userInfo');
    const parsedData = prevData ? JSON.parse(prevData) : null;
    const [user, setUser] = useState(null); // Initial user state is null

    // Any functions to get or update user data can be defined here
    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser,loggerData:parsedData }}>
            <ToastContainer />
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
