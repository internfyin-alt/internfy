"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

const CreativeSection = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/business/background.75728d9adc70.webp')",
      }}
    >
      {/* Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Animated Badge */}
        <div className={`mb-6 transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-white/20">
            🚀 Creative Solutions
          </span>
        </div>

        {/* LEFT TEXT */}
        <h2
          className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition-all duration-1000 ${
            show ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"
          }`}
        >
          We make the creative
        </h2>

        {/* RIGHT TEXT */}
        <h2
          className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 transition-all duration-1000 delay-200 ${
            show ? "translate-x-0 opacity-100" : "translate-x-32 opacity-0"
          }`}
        >
          solutions for business!
        </h2>

        {/* Description */}
        <p className={`text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-400 ${
          show ? "opacity-100" : "opacity-0"
        }`}>
          Transform your business with our innovative and creative digital solutions tailored to your needs.
        </p>

        {/* BUTTON */}
        <Link
          href="/contact"
          className={`group px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold text-white rounded-full
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
            hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
            transition-all duration-500 hover:scale-110 hover:shadow-2xl
            flex w-fit items-center gap-2 mx-auto
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Contact Us
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default CreativeSection;
