"use client";

import { useState } from "react";

// import your images
const img1 = "/assets/wipro.0931a3466d6c.webp";
const img2 = "/assets/waste.0250d13b1ce6.webp";
const img3 = "/assets/birla.3f1b686dc2be.webp";
const img4 = "/assets/niit.2db1cd97a03b.webp";
const img5 = "/assets/fiserv.488a564b6323.webp";

const images = [img1, img2, img3, img4, img5];

const ImageHoverSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-10">
          {images.map((img, index) => (
            <img loading="lazy" decoding="async"
              key={index}
              src={img}
              alt="tech"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`
                w-24 md:w-28 lg:w-32
                object-contain
                cursor-pointer
                transition-all duration-300
                ${
                  activeIndex !== null && activeIndex !== index
                    ? "opacity-30"
                    : "opacity-100"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageHoverSection;
