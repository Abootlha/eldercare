import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Mail } from "lucide-react";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const response = await axios.post("https://eldercare-5xuc.onrender.com/api/auth/forgot-password", {
        email: email
      });

      toast.success(response.data.message || "Password reset link sent to your email");
      navigate("/email-confirmation");
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        "Failed to send password reset link. Please try again."
      );
    }
  };

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
            <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
            <p className="text-gray-600 mt-2">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Send Reset Link
            </button>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link 
                to="/login" 
                className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};