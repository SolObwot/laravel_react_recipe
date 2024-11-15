import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Validate token and get user info
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/user-profile'); // Adjust endpoint as per your API
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('access_token');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/login', credentials);
      localStorage.setItem('access_token', response.data.token);
      setUser(response.data.user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';
  const isSalesManager = () => user?.role === 'sales_manager';
  const canUpdateFollowUp = () => isAdmin() || isSalesManager();

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isLoggedIn, 
      setIsLoggedIn,
      login,
      logout,
      isAdmin, 
      isSalesManager, 
      canUpdateFollowUp 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);