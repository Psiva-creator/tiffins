import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    // Temporary mock logic for testing the UI
    setIsAuthenticated(true);
    setUser({ email });
    
    if (email.includes('owner')) setRole('owner');
    else if (email.includes('chef')) setRole('chef');
    else setRole('customer');
  };

  const logout = async () => {
    // Placeholder logout
  };

  const refreshUser = async () => {
    // Placeholder refresh
  };

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
