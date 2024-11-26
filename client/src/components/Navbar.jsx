import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, LogOut, UserCircle } from 'lucide-react';

// Create a custom event for authentication changes
const AUTH_CHANGE_EVENT = 'authStateChange';

export const Navbar = ({isAuth, setIsAuth}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  // Function to dispatch auth change event
  const dispatchAuthChange = () => {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  // Check and update auth state
  const checkAuthState = () => {
    const token = localStorage.getItem('authToken');
    const userString = localStorage.getItem('user');
    
    // Safely parse user data
    let storedUser = null;
    try {
      if (userString) {
        storedUser = JSON.parse(userString);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Remove invalid user data
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }

    setAuthToken(token);
    setUser(storedUser);
    setLoading(false);
  };

  // Initial auth state check
  useEffect(() => {
    checkAuthState();

    // Listen for auth changes across tabs/windows
    window.addEventListener(AUTH_CHANGE_EVENT, checkAuthState);
    window.addEventListener('storage', checkAuthState);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, checkAuthState);
      window.removeEventListener('storage', checkAuthState);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    setAuthToken(null);
    dispatchAuthChange(); // Trigger auth state change event
    window.location.href = '/login';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-gray-900">eldercare</span>
          </Link>

          <div className="flex items-center space-x-4">
          {isAuth ? (
  <div className="flex items-center space-x-4">
    <Link 
      to="/dashboard" 
      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
    >
      <UserCircle className="h-5 w-5 mr-2" />
      Profile
    </Link>

    {user?.role === 'admin' && (
      <Link
        to="/admin"
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Admin Panel
      </Link>
    )}

    <button
      onClick={logout}
      className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
    >
      <LogOut className="h-5 w-5 mr-2" />
      Logout
    </button>
  </div>
) : (
  <div className="flex items-center space-x-4">
    <Link
      to="/login"
      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
    >
      <User className="h-5 w-5 mr-2" />
      Login
    </Link>
    <Link
      to="/signup"
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
    >
      Sign Up
    </Link>
  </div>
)}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Function to handle login from other components
export const handleLogin = (userData, token) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('authToken', token);
  window.dispatchEvent(new Event('authStateChange'));
};

export default Navbar;