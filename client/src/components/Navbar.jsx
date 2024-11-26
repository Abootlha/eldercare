import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const [user, setUser] = useState(null); // Store user state
  const [loading, setLoading] = useState(true); // State to track loading

  // Simulate fetching user data (e.g., from localStorage or API)
  useEffect(() => {
    const fetchedUser = JSON.parse(localStorage.getItem('user')); // Example: getting user from localStorage
    if (fetchedUser) {
      setUser(fetchedUser);
    }
    setLoading(false); // Done loading
  }, []);

  const logout = () => {
    // Handle logout logic (e.g., clearing user data and redirecting)
    localStorage.removeItem('user');
    setUser(null); // Clear user from state
    window.location.href = '/'; // Redirect to home page or login page
  };

  if (loading) return <div>Loading...</div>; // Display loading state while checking user

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-gray-900">eldercare</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
