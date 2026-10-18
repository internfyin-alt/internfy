"use client";

import { useEffect, useState } from "react";

const Loader = () => {
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const timer = setTimeout(() => {
      setHide(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="text-center px-4">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto relative animate-pulse">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-spin-slow"></div>
            <img
              src="/internfy-logo.png"
              alt="Internfy"
              className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain rounded-full animate-bounce"
            />
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-widest animate-fade-in-up">
          Internfy
        </h1>

        {/* Tagline */}
        <p className="text-blue-300/80 mt-3 animate-fade-in-up animation-delay-200">
          Crafting Digital Experiences
        </p>

        {/* Progress Bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/60 text-sm mt-2">{progress}% Loaded</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
