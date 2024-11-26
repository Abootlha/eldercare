import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { MissingPersonForm } from "./pages/MissingPersonForm";
import { SignLanguage } from "./pages/SignLanguage";
import { MedicalData } from "./pages/MedicalData";
import { AdminPanel } from "./pages/AdminPanel";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess"; // Import the new component

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status and user role
  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return { isAuthenticated: false, isAdmin: false };

    try {
      const userData = JSON.parse(localStorage.getItem("userRole")); // Example user data storage
      return {
        isAuthenticated: true,
        isAdmin: userData?.role === "admin", // Validate admin role
      };
    } catch (error) {
      console.error("Error parsing user role:", error);
      return { isAuthenticated: false, isAdmin: false };
    }
  };

  useEffect(() => {
    const { isAuthenticated, isAdmin } = checkAuth();
    setIsAuth(isAuthenticated);
    setIsAdmin(isAdmin);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>; // Replace with a spinner or loading component

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/" /> : <Login setIsAuth={setIsAuth} />}
            />
            <Route
              path="/signup"
              element={isAuth ? <Navigate to="/" /> : <Signup />}
            />
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
              element={isAuth && isAdmin ? <AdminPanel /> : <Navigate to="/login" />}
            />
            <Route path="/google-auth-success" element={<GoogleAuthSuccess setIsAuth={setIsAuth} />} // Add the new Google auth success route here
            />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
