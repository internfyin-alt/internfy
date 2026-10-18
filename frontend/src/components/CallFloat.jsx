"use client";

import React from "react";

const CallFloat = () => {
  const phoneNumber = "+918757614978"; 

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="
        fixed
        right-4
        bottom-6
        z-40
        flex
        items-center
        justify-center
        w-14
        h-14
        md:w-16
        md:h-16
        rounded-full
        bg-blue-600
        text-white
        shadow-lg
        hover:bg-blue-700
        hover:scale-110
        transition
        duration-300
      "
      aria-label="Call Now"
    >
      {/* Phone Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.25 1.01l-2.2 2.19z" />
      </svg>
    </a>
  );
};

export default CallFloat;
