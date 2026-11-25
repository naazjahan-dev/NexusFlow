import React, { createContext, useContext, useState } from 'react';

// Simple auth context that persists the logged‑in user in localStorage.
// This is **only** for demo purposes – it is NOT production‑secure.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nexusflow_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem('nexusflow_user');
      return null;
    }
  });

  // Helper to persist user
  const persist = (u) => {
    if (u) {
      localStorage.setItem('nexusflow_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('nexusflow_user');
    }
  };

  const login = (email, password) => {
    // In a real app you would call a backend. Here we just check against stored users.
    const users = JSON.parse(localStorage.getItem('nexusflow_users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      persist(found);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (fullName, email, password) => {
    const users = JSON.parse(localStorage.getItem('nexusflow_users') || '[]');
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = { id: Date.now().toString(), fullName, email, password };
    const updated = [...users, newUser];
    localStorage.setItem('nexusflow_users', JSON.stringify(updated));
    // Auto‑login after registration
    setUser(newUser);
    persist(newUser);
    return { success: true };
  };

  const updateProfile = (changes) => {
    if (!user) return;
    const updated = { ...user, ...changes };
    setUser(updated);
    persist(updated);
    const users = JSON.parse(localStorage.getItem('nexusflow_users') || '[]');
    localStorage.setItem('nexusflow_users', JSON.stringify(users.map(u => u.id === updated.id ? { ...u, ...changes } : u)));
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
