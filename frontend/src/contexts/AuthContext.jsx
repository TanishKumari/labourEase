import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('loggedInUser');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }, [user]);

  const login = (identifier, password) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const matchedUser = users.find(
      (u) =>
        (u.email === identifier || u.phone === identifier) &&
        u.password === password
    );

    if (matchedUser) {
      setUser(matchedUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
