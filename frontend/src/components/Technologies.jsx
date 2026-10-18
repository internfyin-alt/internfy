"use client";

import { useState } from "react";

const aws = "/assets/aws.34a1817e273d.webp";
const supabase = "/assets/superbaised.9e301f1a1693.webp";
const nodejs = "/assets/nodejs.acf1a8e4d355.webp";
const react = "/assets/react.775ff3c1aa46.webp";
const node = "/assets/node.f05036350040.webp";
const coder = "/assets/coder.f2ee1041dd18.webp";
const docker = "/assets/docker.7befe4c2b0ce.webp";
const panda = "/assets/panda.0ba34e9019bd.webp";

const techImages = [
  { img: aws, color: "#FF9900" },      // AWS orange
  { img: supabase, color: "#3ECF8E" }, // Supabase green
  { img: nodejs, color: "#68A063" },   // Node green
  { img: react, color: "#61DAFB" },    // React blue
  { img: node, color: "#3C873A" },     // Node dark green
  { img: coder, color: "#6366F1" },    // Indigo
  { img: docker, color: "#2496ED" },   // Docker blue
  { img: panda, color: "#22C55E" },    // Green
];

const Technologies = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-24 bg-sky-50 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-sky-600 mb-14 animate-fade-in">
        Technologies We Work With
      </h2>

      <div className="w-full overflow-hidden">
        <div
          className={`flex gap-20 w-max items-center ${
            paused ? "" : "animate-marquee"
          }`}
        >
          {[...techImages, ...techImages].map((item, index) => (
            <img loading="lazy" decoding="async"
              key={index}
              src={item.img}
              alt="technology"
              onClick={() => setPaused(!paused)}
              style={{
                filter: `drop-shadow(0 0 18px ${item.color})`,
              }}
              className="
                w-20 md:w-24 lg:w-28
                object-contain
                cursor-pointer
                transition-transform duration-500
                hover:scale-125
              "
            />
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-8 animate-pulse">
        Click on any logo to pause / resume
      </p>
    </section>
  );
};

export default Technologies;
