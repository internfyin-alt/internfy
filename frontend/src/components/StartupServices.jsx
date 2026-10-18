"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FaCloudMeatball } from "react-icons/fa6";
import { ArrowRight, ChevronLeft, ChevronRight, Cloud, Code, Database, Globe } from 'lucide-react';

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const services = [
    {
      title: "Startup Cloud Solutions",
      description: "Secure, scalable, and reliable cloud infrastructure tailored for Startup needs. Includes migration, optimization, and 24/7 support.",
      points: ["Responsive Web Design", "API Integration", "Robust Back-end Architecture", "Cloud Migration"],
      icon: <Cloud className="w-10 h-10 text-blue-500" />,
      link: "/cloudservice"
    },
    {
      title: "Custom Web App",
      description: "Building high-performance web applications using the latest tech stack like MERN for your business growth.",
      points: ["React Development", "Node.js Backend", "Next.js SEO", "Redux State Management"],
      icon: <Code className="w-10 h-10 text-blue-500" />,
      link: "/webservice"
    },
    {
      title: "Full Stack Systems",
      description: "End-to-end development focusing on scalability and user experience for modern startup ecosystems.",
      points: ["Database Design", "System Security", "UI/UX Optimization", "DevOps Setup"],
      icon: <Database className="w-10 h-10 text-blue-500" />,
      link: "/backendservice"
    },
    {
      title: "Cloud",
      description: "End-to-end development focusing on scalability and user experience for modern startup ecosystems.",
      points: ["Database Design", "System Security", "UI/UX Optimization", "DevOps Setup"],
      icon: <FaCloudMeatball className="w-10 h-10 text-blue-500" />,
      link: "/cloudservice"
    },
    {
      title: "Global Infrastructure",
      description: "Scale your business globally with our specialized international server management and deployment.",
      points: ["Global CDN", "Multi-region Hosting", "Data Privacy", "Auto-scaling"],
      icon: <Globe className="w-10 h-10 text-blue-500" />,
      link: "/apiservice"
    }
  ];

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setCardsPerView(1);
        setCurrentIndex((index) => Math.min(index, services.length - 1));
      } else if (window.innerWidth < 1024) { // tablet
        setCardsPerView(2);
        setCurrentIndex((index) => Math.min(index, services.length - 2));
      } else { // desktop
        setCardsPerView(3);
        setCurrentIndex((index) => Math.min(index, services.length - 3));
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = services.length - cardsPerView;
      return prev + 1 > maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = services.length - cardsPerView;
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  // Don't show arrows if all cards are visible
  const showArrows = services.length > cardsPerView;

  return (
    <section className="py-12 md:py-20 bg-white px-4 sm:px-6 md:px-20 overflow-hidden">
      {/* --- Header Section (Center) --- */}
      <div className="text-center mb-10 md:mb-16 space-y-4 animate-fade-in">
        <button className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm md:text-base animate-bounce hover:bg-blue-700 transition">
          Our Services
        </button>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 px-4">
          Startup Solutions Portfolio
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base lg:text-lg px-4">
          Comprehensive technology solutions designed to drive Startup growth, efficiency, and innovation.
        </p>
      </div>

      {/* --- Slider Container --- */}
      <div className="relative group">
        {/* Left/Right Arrows - Hide on mobile if needed */}
        {showArrows && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 md:left-[-50px] top-1/2 -translate-y-1/2 bg-gray-100 p-2 md:p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all z-30 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-[30px] md:w-[30px]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 md:right-[-50px] top-1/2 -translate-y-1/2 bg-gray-100 p-2 md:p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all z-30 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-[30px] md:w-[30px]" />
            </button>
          </>
        )}

        {/* --- Cards Slider Container --- */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
          >
            {services.map((item, index) => (
              <div
                key={index}
                className="min-w-0 flex-shrink-0 w-full px-2 py-4 sm:px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="border border-gray-100 bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="mb-4 md:mb-6">{item.icon}</div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-gray-800">{item.title}</h4>
                  <p className="text-gray-500 mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm flex-grow">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-6 md:mb-8">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Box with Animation */}
                  <Link
                    href={item.link}
                    className="inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 border-2 border-gray-200 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 group/link w-full sm:w-auto"
                  >
                    <span className="text-sm sm:text-base">Learn More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator - Mobile */}
        {showArrows && (
          <div className="flex justify-center mt-6 md:hidden gap-2">
            {Array.from({ length: services.length - cardsPerView + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSlider;
