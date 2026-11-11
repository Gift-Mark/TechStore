import { useState } from 'react';
import AuthContext from './authContextValue';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email) => {
    // Simulate user login session
    setUser({ email, name: email.split('@')[0] });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}