import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedToken = localStorage.getItem('authToken');
      
      
      if (onComplete) {
        onComplete(!!storedToken);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Splash Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1, 
          ease: "easeInOut"
        }}
        className="z-10 text-center"
      >
        <div className="flex justify-center mb-6">
          <Heart className="h-24 w-24 text-blue-600 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ElderCare Platform
        </h1>
        <p className="text-xl text-gray-600">
          Caring for our Seniors
        </p>
      </motion.div>
    </div>
  );
};