import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('emi-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null

  const signUp = ({ name, email, password }) => {
    // In a real app this would call an API; here we simulate with localStorage
    const users = JSON.parse(localStorage.getItem('emi-users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('emi-users', JSON.stringify(users));
    const session = { name, email };
    setUser(session);
    localStorage.setItem('emi-user', JSON.stringify(session));
    setAuthModal(null);
  };

  const signIn = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('emi-users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Invalid email or password.');
    }
    const session = { name: found.name, email: found.email };
    setUser(session);
    localStorage.setItem('emi-user', JSON.stringify(session));
    setAuthModal(null);
  };

  const updateProfile = ({ name }) => {
    if (!user) throw new Error('You must be signed in to update your profile.');
    
    // Update users list
    const users = JSON.parse(localStorage.getItem('emi-users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex === -1) throw new Error('User account not found.');
    users[userIndex].name = name;
    localStorage.setItem('emi-users', JSON.stringify(users));

    // Update current session
    const updatedUser = { ...user, name };
    setUser(updatedUser);
    localStorage.setItem('emi-user', JSON.stringify(updatedUser));
  };

  const updatePassword = (newPassword) => {
    if (!user) throw new Error('You must be signed in to change your password.');
    const users = JSON.parse(localStorage.getItem('emi-users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex === -1) {
      throw new Error('User account not found.');
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('emi-users', JSON.stringify(users));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('emi-user');
  };

  const openSignIn = () => setAuthModal('signin');
  const openSignUp = () => setAuthModal('signup');
  const closeModal = () => setAuthModal(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile, updatePassword, authModal, openSignIn, openSignUp, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
