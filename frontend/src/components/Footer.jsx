"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Heart,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Training", href: "/training" },
    { name: "Staffing", href: "/staffing" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Website Development", href: "/webservice" },
    { name: "Web Application Development", href: "/webservice" },
    { name: "Cloud Services", href: "/cloudservice" },
    { name: "Backend Development", href: "/backendservice" },
    { name: "API Integration", href: "/apiservice" },
  ];

  return (
    <footer className="relative bg-black text-gray-300 overflow-hidden cursor-default">

      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/internfy-logo.png"
              alt="Internfy"
              width={112}
              height={112}
              sizes="112px"
              className="h-28 w-28 object-contain rounded-full mb-6"
            />

            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Internfy builds modern, scalable and futuristic digital solutions.
              We specialize in creating professional websites and powerful web
              applications that help businesses grow online.
            </p>

            <motion.div
              className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Globe size={16} />
              We Build Professional Websites & Web Apps
            </motion.div>

            <div className="space-y-3 text-sm">
              <a
                href="tel:+917761980518"
                className="flex items-center gap-2 hover:text-white transition cursor-pointer"
              >
                <Phone size={16} />
                +91 7761980518
              </a>

              <a
                href="mailto:internfy.in@gmail.com"
                className="flex items-center gap-2 hover:text-white transition cursor-pointer"
              >
                <Mail size={16} />
                internfy.in@gmail.com
              </a>

              <a
                href="https://maps.google.com/?q=Noida+India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition cursor-pointer"
              >
                <MapPin size={16} />
                Noida, India
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="hover:text-purple-400 transition cursor-pointer"
                >
                  <Link href={service.href}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">
              Connect With Us
            </h4>

            <div className="flex gap-4 flex-wrap">

              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
              >
                <Facebook size={20} />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/internfy_official/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
              >
                <Instagram size={20} />
              </motion.a>

              <motion.a
                href="https://www.youtube.com/@Internfy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
              >
                <Youtube size={20} />
              </motion.a>

            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-center md:text-left">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Internfy. All rights reserved.
            <Heart size={14} className="text-red-500" fill="currentColor" />
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition cursor-pointer">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
