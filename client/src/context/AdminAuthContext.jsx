import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('bottle_return_admin_token') || null;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bottle_return_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('bottle_return_admin_token', authToken);
    localStorage.setItem('bottle_return_admin_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('bottle_return_admin_token');
    localStorage.removeItem('bottle_return_admin_user');
  };

  const isAuthenticated = !!token;

  return (
    <AdminAuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
