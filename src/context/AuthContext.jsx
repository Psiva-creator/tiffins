import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {}
});
