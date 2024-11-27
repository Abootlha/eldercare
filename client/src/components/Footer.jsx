import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleServicesClick = (to) => {
    if (isAuth) {
      navigate(to);
    } else {
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 3000);
    }
  };

  const handleLogout = () => {
    // Clear authentication token and reset state
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">ElderCare</span>
            </div>
            <p className="mt-4 text-gray-600">
              Providing comprehensive healthcare solutions for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicesClick('/dashboard');
                  }}
                >
                  Report Missing Person
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicesClick('/dashboard');
                  }}
                >
                  Sign Language System
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicesClick('/dashboard');
                  }}
                >
                  Medical Data Storage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="text-gray-600">support@eldercare.com</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">123 Healthcare Street</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} ElderCare. All rights reserved.
          </p>
        </div>
      </div>

      {/* Snackbar Component */}
      {snackbarVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>Please login to access the dashboard</p>
        </div>
      )}

      {/* Logout Button */}
      
    </footer>
  );
};

export default Footer;
