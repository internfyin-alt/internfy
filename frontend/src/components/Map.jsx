"use client";

import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const Map = () => {
  const locations = [
    {
      city: "Noida",
      phone: "6202680423",
      mapEmbed: "https://www.google.com/maps?q=Noida&output=embed",
      icon: "🏢",
    },
    {
      city: "Delhi",
      phone: "7761980518",
      mapEmbed: "https://www.google.com/maps?q=Delhi&output=embed",
      icon: "🏙️",
    },
    {
      city: "Patna",
      phone: "8757614978",
      mapEmbed: "https://www.google.com/maps?q=Patna+Bihar&output=embed",
      icon: "🏛️",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Our Locations
          </h1>
          <div className="w-20 h-1 bg-gray-300 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            Connect with us instantly at any of our branches
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
                         transition-shadow duration-300 
                         border border-gray-200 flex flex-col"
            >
              <div className="p-5 sm:p-6 flex flex-col h-full">

                {/* City */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{location.icon}</span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {location.city}
                  </h2>
                </div>

                {/* Map */}
                <div className="w-full h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden mb-4 border">
                  <iframe
                    title={`${location.city} map`}
                    src={location.mapEmbed}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/91${location.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-green-500 text-white 
                               rounded-lg flex items-center 
                               justify-center gap-2
                               hover:bg-green-600 
                               transition-colors duration-300 text-sm sm:text-base"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </a>

                  {/* Call Now */}
                  <a
                    href={`tel:${location.phone}`}
                    className="flex-1 px-4 py-3 bg-blue-500 text-white 
                               rounded-lg flex items-center 
                               justify-center gap-2
                               hover:bg-blue-600 
                               transition-colors duration-300 text-sm sm:text-base"
                  >
                    <FaPhoneAlt />
                    Call Now
                  </a>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Map;
