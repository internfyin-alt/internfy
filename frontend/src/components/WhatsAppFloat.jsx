"use client";

import React from "react";

const WhatsAppFloat = () => {
  const phoneNumber = "8757614978"; // change to your WhatsApp number
  const message = "Hello, I want to know more about your services.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        left-4
        bottom-6
        z-40
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-full
        bg-green-500
        shadow-lg
        hover:bg-green-600
        hover:scale-110
        transition
        duration-300
      "
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="w-7 h-7"
      >
        <path d="M16 .396C7.163.396.001 7.559.001 16.396c0 2.89.753 5.71 2.183 8.191L0 32l7.615-2.144a15.93 15.93 0 008.385 2.432c8.837 0 15.999-7.163 15.999-16S24.837.396 16 .396zm0 29.093a13.16 13.16 0 01-6.707-1.842l-.48-.284-4.523 1.273 1.208-4.408-.312-.452a13.16 13.16 0 01-2.052-7.378c0-7.262 5.907-13.169 13.17-13.169s13.169 5.907 13.169 13.169-5.907 13.17-13.169 13.17zm7.518-9.91c-.412-.206-2.438-1.203-2.817-1.34-.379-.138-.655-.206-.93.206-.275.412-1.068 1.34-1.31 1.616-.24.275-.481.309-.894.103-.412-.206-1.741-.642-3.316-2.048-1.226-1.093-2.054-2.444-2.295-2.856-.24-.412-.025-.634.18-.84.184-.183.412-.481.619-.722.206-.24.275-.412.412-.687.138-.275.069-.516-.034-.722-.103-.206-.93-2.238-1.274-3.066-.334-.802-.673-.693-.93-.706l-.792-.013c-.275 0-.722.103-1.1.516-.378.412-1.444 1.41-1.444 3.444s1.479 3.997 1.685 4.272c.206.275 2.91 4.448 7.048 6.237.985.425 1.753.679 2.352.869.988.314 1.888.27 2.599.164.792-.118 2.438-.998 2.783-1.961.344-.964.344-1.788.24-1.961-.103-.172-.378-.275-.79-.481z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloat;
