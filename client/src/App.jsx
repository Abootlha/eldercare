import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { MissingPersonForm } from './pages/MissingPersonForm';
import { SignLanguage } from './pages/SignLanguage';
import { MedicalData } from './pages/MedicalData';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated by checking for a token in localStorage
  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    return token !== null; // If a token exists, the user is authenticated
  };

  useEffect(() => {
    setLoading(false); // Simulate loading state
    setIsAuth(checkAuth()); // Update authentication state based on token presence
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} /> {/* Pass setIsAuth as prop */}
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/reports"
              element={isAuth ? <MissingPersonForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/translator"
              element={isAuth ? <SignLanguage /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/medical"
              element={isAuth ? <MedicalData /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={isAuth && checkAdminAuth() ? <AdminPanel /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

const checkAdminAuth = () => {
  // Assuming an admin role is saved in the token or user object in localStorage
  const userRole = JSON.parse(localStorage.getItem("userRole")); // Example of getting the user role from localStorage
  return userRole === "admin"; // If the role is admin, return true
};

export default App;
