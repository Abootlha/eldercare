import React, { useState, useEffect  } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Lock, User } from "lucide-react";

export const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isGoogleAuth) {
        // Handle Google Authentication
        const res = await fetch("http://localhost:3001/api/auth/google-request", {
          method: "GET",
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("Google authentication URL is not available.");
        }
      } else {
        // Handle Username and Password Authentication
        const response = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrUsername: username,
            password: password,
          }),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        // Store token and navigate
        localStorage.setItem("authToken", data.token);
        toast.success("Successfully logged in!");
        setIsAuth(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Authentication Error:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    console.log("Full URL:", window.location.href);
    console.log("URL Params:", urlParams.toString());
    console.log("Extracted token:", token);

    if (token) {
      localStorage.setItem("authToken", token);
      toast.success("Google authentication successful!");
      setIsAuth(true);
      navigate("/dashboard");
    }
  }, [navigate, setIsAuth]);  // Dependency array updated to ensure it only runs when URL parameters change

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 p-4">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glass Card */}
      <div className="relative max-w-md w-full mx-auto">
        <div className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="text-gray-600 mt-2">
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/signup")}
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Sign up
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Username or Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Password"
              />
            </div>

             {/* Forgot Password Link */}
            <div className="text-right">
              <button
                onClick={() => navigate("/forgotpassword")}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Forgot your password?
              </button>
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => setIsGoogleAuth(false)}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/30 text-gray-600 backdrop-blur-sm">Or sign in with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="submit"
              onClick={() => setIsGoogleAuth(true)}
              className="w-full flex items-center justify-center py-3 px-4 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 transition duration-200 ease-in-out transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
