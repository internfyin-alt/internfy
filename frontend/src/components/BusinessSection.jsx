"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const data = [
  {
    title: "Grow your business",
    desc: "We believe in challenges and so we have made challenges to help you grow exponentially.",
    img: "/business/Grow.97aa16b74766.webp",
  },
  {
    title: "Cost savings ideas",
    desc: "We also help our clients with social media strategy and cost-effective solutions.",
    img: "/business/cost.cd29d0fd033c.webp",
  },
  {
    title: "Boost performance",
    desc: "We deliver email marketing campaigns and performance optimization to your audience.",
    img: "/business/air.ffd72bb8b698.webp",
  },
];

const BusinessSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* LEFT IMAGE */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-100 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <Image
                    width={64}
                    height={64}
                    sizes="64px"
                    src={item.img}
                    alt={item.title}
                    className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* TEXT */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {item.desc}
                  </p>

                  {/* Hover Line Effect */}
                  <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
