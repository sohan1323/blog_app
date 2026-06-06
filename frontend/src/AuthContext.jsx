import React, { createContext, useState, useEffect } from 'react';
import api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await api.get('accounts/profile/me/');
          setProfile(res.data);
          setUser(res.data.user);
        } catch (error) {
          console.error("Auth check failed", error);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await api.post('accounts/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    
    // Fetch user details immediately after login
    const profileRes = await api.get('accounts/profile/me/');
    setProfile(profileRes.data);
    setUser(profileRes.data.user);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
