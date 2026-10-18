"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef([]);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const portfolioRefs = useRef([]);
  const projectsSectionRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
  });
  
  // NEW: Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);
  
  // NEW: Pricing Calculator States
  const [showPricingCalculator, setShowPricingCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    serviceType: "",
    pages: 1,
    features: [],
    timeline: "standard",
    support: "basic"
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  
  // NEW: Projects expansion state
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const { push: navigate } = useRouter();

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const servicesData = [
    {
      title: "Custom Website Development",
      desc: "We build stunning, responsive websites tailored to your brand. From portfolio sites to business websites, we create exactly what you need.",
      icon: "💻",
      features: ["Responsive Design", "Custom CMS", "SEO Optimized", "Fast Loading"],
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      category: "development",
      basePrice: 25000,
    },
    {
      title: "E-Commerce Solutions",
      desc: "Launch your online store with our complete e-commerce solutions. Product management, secure payments, and inventory control included.",
      icon: "🛒",
      features: ["Payment Integration", "Product Management", "Shopping Cart", "Order Tracking"],
      color: "from-green-500 to-emerald-600",
      gradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      category: "ecommerce",
      basePrice: 45000,
    },
    {
      title: "Business Website",
      desc: "Professional business websites that establish your online presence and help you attract more customers.",
      icon: "🏢",
      features: ["Company Profile", "Service Showcase", "Contact Forms", "Google Maps"],
      color: "from-purple-500 to-pink-600",
      gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
      category: "business",
      basePrice: 30000,
    },
    {
      title: "Portfolio & Personal",
      desc: "Showcase your work with a beautiful portfolio website. Perfect for designers, photographers, artists, and creatives.",
      icon: "🎨",
      features: ["Gallery Layout", "Project Showcase", "Client Testimonials", "Blog Ready"],
      color: "from-orange-500 to-red-600",
      gradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
      category: "portfolio",
      basePrice: 20000,
    },
    {
      title: "Web Application",
      desc: "Complex web applications with user authentication, dashboards, and advanced functionality for your business needs.",
      icon: "⚡",
      features: ["User Dashboard", "Data Management", "API Integration", "Real-time Updates"],
      color: "from-indigo-500 to-blue-600",
      gradient: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/20",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
      category: "development",
      basePrice: 60000,
    },
    {
      title: "Website Redesign",
      desc: "Give your existing website a fresh new look. We redesign outdated websites to modern standards with better UX.",
      icon: "✨",
      features: ["Modern Design", "UX Improvement", "Speed Optimization", "Mobile Friendly"],
      color: "from-yellow-500 to-orange-600",
      gradient: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-600",
      category: "redesign",
      basePrice: 35000,
    },
  ];

  const categories = [
    { id: "all", label: "All Services", icon: "🌟" },
    { id: "development", label: "Development", icon: "💻" },
    { id: "ecommerce", label: "E-Commerce", icon: "🛒" },
    { id: "business", label: "Business", icon: "🏢" },
    { id: "portfolio", label: "Portfolio", icon: "🎨" },
    { id: "redesign", label: "Redesign", icon: "✨" },
  ];

  const portfolioProjects = [
    {
      title: "Coding Website App",
      category: "Coding Website",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      emoji: "🛍️",
      client: "StyleHub Fashion",
      year: "2024",
      color: "from-green-500 to-emerald-500",
      liveUrl: "https://code-sence.vercel.app/",
    },
    {
      title: "Online Food Ordering App",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      emoji: "🏠",
      client: "PropertyFinder",
      year: "2024",
      color: "from-indigo-500 to-blue-500",
      liveUrl: "https://biswasagrofoods.in/",
    },
    {
      title: "Restaurant Website",
      category: "Business Website",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      emoji: "🍽️",
      client: "Tasty Bites",
      year: "2023",
      color: "from-purple-500 to-pink-500",
      liveUrl: "https://trycookify.vercel.app/",
    },
    {
      title: "Photography Portfolio",
      category: "Portfolio",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
      emoji: "📸",
      client: "Capture Moments",
      year: "2024",
      color: "from-orange-500 to-red-500",
      liveUrl: "https://portfoliowebpk.netlify.app/",
    },
    {
      title: "Chat App",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      emoji: "💪",
      client: "FitLife Pro",
      year: "2024",
      color: "from-red-500 to-orange-500",
      liveUrl: "https://trychatflow.vercel.app/login",
    },
    {
      title: "Portfolio Website",
      category: "Portfolio",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      emoji: "✈️",
      client: "Wanderlust Tales",
      year: "2024",
      color: "from-cyan-500 to-blue-500",
      liveUrl: "aakash1.online",
    },
    {
      title: "Quiz App",
      category: "Student Website",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      emoji: "📈",
      client: "Growth Hackers",
      year: "2023",
      color: "from-pink-500 to-rose-500",
      liveUrl: "https://ai-quizforge.vercel.app/",
    },
  ];

  // Get visible projects based on showAllProjects state
  const visibleProjects = showAllProjects ? portfolioProjects : portfolioProjects.slice(0, 4);

  // Pricing features for calculator
  const pricingFeatures = [
    { id: "seo", label: "Advanced SEO", price: 5000, icon: "🎯" },
    { id: "analytics", label: "Analytics Dashboard", price: 3000, icon: "📊" },
    { id: "chat", label: "Live Chat Integration", price: 4000, icon: "💬" },
    { id: "payment", label: "Payment Gateway", price: 8000, icon: "💳" },
    { id: "blog", label: "Blog System", price: 6000, icon: "📝" },
    { id: "multilingual", label: "Multi-language", price: 7000, icon: "🌍" },
    { id: "booking", label: "Booking System", price: 10000, icon: "📅" },
    { id: "crm", label: "CRM Integration", price: 12000, icon: "🔗" },
  ];

  const timelines = [
    { id: "rush", label: "Rush (1-2 weeks)", multiplier: 1.5 },
    { id: "standard", label: "Standard (3-4 weeks)", multiplier: 1 },
    { id: "flexible", label: "Flexible (5+ weeks)", multiplier: 0.85 },
  ];

  const supportPackages = [
    { id: "basic", label: "Basic (1 month)", price: 0 },
    { id: "standard", label: "Standard (3 months)", price: 5000 },
    { id: "premium", label: "Premium (6 months)", price: 10000 },
    { id: "enterprise", label: "Enterprise (12 months)", price: 20000 },
  ];

  // NEW: Handle scroll to collapse expanded projects
  useEffect(() => {
    if (!showAllProjects || !projectsSectionRef.current) return;

    const handleScroll = () => {
      const section = projectsSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      // Collapse when scrolled past the section
      if (sectionBottom < viewportHeight * 0.3) {
        setShowAllProjects(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAllProjects]);

  // NEW: Filter services based on search and category
  useEffect(() => {
    let filtered = servicesData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory]);

  // NEW: Calculate estimated price
  useEffect(() => {
    if (!calculatorData.serviceType) {
      setEstimatedPrice(0);
      return;
    }

    const service = servicesData.find(s => s.title === calculatorData.serviceType);
    if (!service) return;

    let price = service.basePrice;
    price += (calculatorData.pages - 1) * 2000;

    calculatorData.features.forEach(featureId => {
      const feature = pricingFeatures.find(f => f.id === featureId);
      if (feature) price += feature.price;
    });

    const timeline = timelines.find(t => t.id === calculatorData.timeline);
    if (timeline) price *= timeline.multiplier;

    const support = supportPackages.find(s => s.id === calculatorData.support);
    if (support) price += support.price;

    setEstimatedPrice(Math.round(price));
  }, [calculatorData]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      gsap.to(".floating-particle", {
        y: -30,
        x: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          scale: 0,
          rotation: 360,
          opacity: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(2)"
        });
      });

      gsap.from(cardRefs.current, {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      if (portfolioRefs.current[0]) {
        gsap.from(portfolioRefs.current, {
          scrollTrigger: {
            trigger: portfolioRefs.current[0],
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const iconHover = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleCallNow = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleConsultation = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, projectType: service.title });
    setShowConsultForm(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseForm = () => {
    setShowConsultForm(false);
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consultation request:", formData);
    alert(`Thank you ${formData.name}! We'll call you within 24 hours to discuss your ${formData.projectType} project.`);
    handleCloseForm();
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      description: "",
    });
  };

  const handleProjectClick = (liveUrl) => {
    window.open(liveUrl, "_blank", "noopener,noreferrer");
  };

  const handleCalculatorChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setCalculatorData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const openPricingCalculator = () => {
    setShowPricingCalculator(true);
    document.body.style.overflow = "hidden";
  };

  const closePricingCalculator = () => {
    setShowPricingCalculator(false);
    document.body.style.overflow = "auto";
  };

  const toggleProjects = () => {
    setShowAllProjects(!showAllProjects);
    if (!showAllProjects) {
      // Scroll to projects section smoothly when expanding
      setTimeout(() => {
        projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div ref={sectionRef} className="bg-slate-50 overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        className="relative w-full bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/business/service.8c49f8554833.webp')",
          minHeight: "calc(100svh - var(--navbar-height))",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${particleRandom(i, 1) * 100}%`,
                top: `${particleRandom(i, 2) * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl py-16 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              We Build
            </span>{" "}
            <span className="text-white">High-Quality</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Professional
            </span>{" "}
            <span className="text-white">Websites</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-4xl mx-auto"
          >
            From simple portfolio sites to complex e-commerce platforms — 
            <br className="hidden md:block" />
            we bring your ideas to life with modern technology and stunning design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-base font-bold rounded-full text-white
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              hover:shadow-2xl relative overflow-hidden group"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Explore Our Work</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            
            <motion.button
              onClick={openPricingCalculator}
              className="px-10 py-4 text-base font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              relative overflow-hidden group"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>💰</span> Calculate Price
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { number: "150+", label: "Projects Delivered", icon: "🚀" },
              { number: "98%", label: "Client Satisfaction", icon: "⭐" },
              { number: "5+", label: "Years Experience", icon: "⚡" },
              { number: "24/7", label: "Expert Support", icon: "🎯" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                ref={el => statsRef.current[index] = el}
                className="text-center p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* ================= SEARCH & FILTER SECTION ================= */}
      <section id="services-grid" className="relative py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-600 font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Our Expertise
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Professional Website Solutions
              </span>
            </h2>
            
            <p className="text-gray-600 max-w-3xl mx-auto text-base mb-8">
              We build high-quality, professional websites that help businesses grow and succeed online.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Search services... (e.g., e-commerce, portfolio, SEO)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-blue-500 
                focus:ring-4 focus:ring-blue-100 transition-all outline-none text-base bg-white shadow-lg"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.div
                className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl"
                animate={{ rotate: searchQuery ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                🔍
              </motion.div>
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                  }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
                {selectedCategory === category.id && (
                  <motion.span
                    className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {filteredServices.length}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Results count */}
          <AnimatePresence mode="wait">
            {(searchQuery || selectedCategory !== "all") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mb-6"
              >
                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                  {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            {filteredServices.length > 0 ? (
              <motion.div
                ref={cardsContainerRef}
                key="services-grid"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    ref={el => cardRefs.current[index] = el}
                    variants={fadeInUp}
                    whileHover="hover"
                    custom={index}
                    className="group relative cursor-pointer"
                    onClick={() => handleConsultation(service)}
                    layout
                  >
                    <motion.div
                      className={`absolute inset-0 ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl
                    border ${service.borderColor} transition-all duration-500 h-full flex flex-col`}>
                      
                      <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <motion.div
                          className="flex justify-between items-start mb-4"
                          variants={iconHover}
                          whileHover="hover"
                        >
                          <motion.div
                            className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center text-3xl shadow-lg`}
                          >
                            {service.icon}
                          </motion.div>
                          
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                            whileHover={{ scale: 1.1 }}
                          >
                            ₹{(service.basePrice / 1000).toFixed(0)}k+
                          </motion.div>
                        </motion.div>
                        
                        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                          {service.desc}
                        </p>
                        
                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center text-sm text-gray-700"
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConsultation(service);
                          }}
                          className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-sm
                          bg-gradient-to-r ${service.color} shadow-lg
                          relative overflow-hidden group/btn`}
                          variants={buttonHover}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Get Free Consultation
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-20"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔍
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <motion.button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= RECENT PROJECTS (ENHANCED) ================= */}
      <section ref={projectsSectionRef} className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900 to-transparent" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/5 rounded-full"
              style={{
                left: `${particleRandom(i, 3) * 100}%`,
                top: `${particleRandom(i, 4) * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + particleRandom(i, 5) * 2,
                repeat: Infinity,
                delay: particleRandom(i, 6) * 2,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-base">
              Take a look at some of the high-quality websites we've built for our clients
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={showAllProjects ? 'all' : 'limited'}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  ref={el => portfolioRefs.current[index] = el}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative cursor-pointer"
                  onClick={() => handleProjectClick(project.liveUrl)}
                  layout
                >
                  <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                    <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                      <img loading="lazy" decoding="async"
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                        <span className="text-5xl">{project.emoji}</span>
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                        >
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                    <div className="p-4">
                      <motion.div
                        className="text-xs text-blue-400 mb-1"
                        whileHover={{ x: 3 }}
                      >
                        {project.category}
                      </motion.div>
                      <h3 className="text-base font-semibold text-white mb-1">{project.title}</h3>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{project.client}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={toggleProjects}
              className="px-8 py-3 text-white font-semibold rounded-full text-sm
              border-2 border-white/30 hover:border-white
              hover:bg-white/10 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? (
                <>
                  <span>Show Less</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 180 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </>
              ) : (
                <>
                  <span>View All Projects ({portfolioProjects.length})</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Why Clients Choose{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Us
                </span>
              </h2>
              <p className="text-gray-600 text-base mb-6">
                We don't just build websites — we create high-quality digital experiences that help 
                businesses grow and succeed online.
              </p>

              <div className="space-y-4">
                {[
                  { title: "100% Client Satisfaction", desc: "We work closely with you to ensure the final product exceeds your expectations.", icon: "🎯" },
                  { title: "Modern Technology", desc: "We use the latest technologies like React, Next.js, and Tailwind CSS.", icon: "⚡" },
                  { title: "Professional Team", desc: "Experienced developers and designers dedicated to your success.", icon: "👥" },
                  { title: "Free Support", desc: "We provide 1 month of free support and training after your website is live.", icon: "🎁" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-base font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Ready to Build Your Professional Website?</h3>
                <p className="mb-6 text-white/90 text-sm">
                  Get a free consultation for your project. No obligations, just honest advice from experts.
                </p>
                
                <div className="space-y-3">
                  <motion.button
                    onClick={handleCallNow}
                    className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold text-sm 
                    hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>📞</span> Call Now: +91 98765 43210
                  </motion.button>
                  
                  <motion.button
                    onClick={openPricingCalculator}
                    className="w-full py-3 border-2 border-white/30 text-white rounded-lg font-semibold text-sm 
                    hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>💰</span> Calculate Your Price
                  </motion.button>
                </div>

                <div className="mt-6 flex items-center gap-3 text-xs text-white/80">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-white/20 border-2 border-white/30" />
                    ))}
                  </div>
                  <span>Join 100+ happy clients</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 text-center px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${particleRandom(i, 7) * 100}%`,
                top: `${particleRandom(i, 8) * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + particleRandom(i, 9) * 2,
                repeat: Infinity,
                delay: particleRandom(i, 10) * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-extrabold text-white mb-4"
          >
            Ready to Build Your High-Quality Website?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-base mb-8"
          >
            Let's discuss how we can help you create a professional website for your business.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={handleCallNow}
              className="px-8 py-3 text-base font-bold bg-white text-blue-600 rounded-full
              hover:bg-gray-100 transition-all duration-500 shadow-2xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 30px 40px -10px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📞</span> Call Now: +91 98765 43210
            </motion.button>
            
            <motion.button
              onClick={openPricingCalculator}
              className="px-8 py-3 text-base font-bold text-white border-2 border-white rounded-full
              hover:bg-white hover:text-blue-600 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💰 Calculate Price
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-white/80 mt-6 text-xs"
          >
            ⚡ Average response time: 15 minutes ⚡
          </motion.p>
        </div>
      </section>

      {/* ================= PRICING CALCULATOR MODAL ================= */}
      <AnimatePresence>
        {showPricingCalculator && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePricingCalculator}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white relative">
                <motion.button
                  onClick={closePricingCalculator}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
                
                <motion.div
                  className="text-6xl mb-3"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💰
                </motion.div>
                
                <h2 className="text-3xl font-bold mb-2">Project Price Calculator</h2>
                <p className="text-white/90">Get an instant estimate for your website project</p>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Inputs */}
                  <div className="space-y-6">
                    {/* Service Type */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        1️⃣ Select Service Type *
                      </label>
                      <div className="space-y-2">
                        {servicesData.map((service) => (
                          <motion.button
                            key={service.title}
                            onClick={() => handleCalculatorChange('serviceType', service.title)}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2
                              ${calculatorData.serviceType === service.title
                                ? `bg-gradient-to-r ${service.gradient} ${service.borderColor} border-opacity-100`
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                              }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{service.icon}</span>
                                <div>
                                  <div className="font-semibold text-sm">{service.title}</div>
                                  <div className="text-xs text-gray-500">Starting ₹{(service.basePrice / 1000).toFixed(0)}k</div>
                                </div>
                              </div>
                              {calculatorData.serviceType === service.title && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-green-500 text-xl"
                                >
                                  ✓
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Number of Pages */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        2️⃣ Number of Pages: <span className="text-blue-600">{calculatorData.pages}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={calculatorData.pages}
                        onChange={(e) => handleCalculatorChange('pages', parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(147, 51, 234) ${(calculatorData.pages / 20) * 100}%, rgb(226, 232, 240) ${(calculatorData.pages / 20) * 100}%, rgb(226, 232, 240) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 page</span>
                        <span>20+ pages</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Each additional page adds ₹2,000 to the base price
                      </p>
                    </motion.div>

                    {/* Additional Features */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        3️⃣ Additional Features
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {pricingFeatures.map((feature) => (
                          <motion.button
                            key={feature.id}
                            onClick={() => handleFeatureToggle(feature.id)}
                            className={`p-3 rounded-lg text-xs font-semibold transition-all duration-300 border-2
                              ${calculatorData.features.includes(feature.id)
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xl">{feature.icon}</span>
                              <span>{feature.label}</span>
                              <span className="text-[10px] opacity-80">+₹{(feature.price / 1000).toFixed(0)}k</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        4️⃣ Project Timeline
                      </label>
                      <div className="space-y-2">
                        {timelines.map((timeline) => (
                          <motion.button
                            key={timeline.id}
                            onClick={() => handleCalculatorChange('timeline', timeline.id)}
                            className={`w-full p-3 rounded-lg text-sm font-semibold transition-all duration-300 border-2
                              ${calculatorData.timeline === timeline.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                              }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{timeline.label}</span>
                              <span className="text-xs opacity-80">
                                {timeline.multiplier > 1 ? `+${((timeline.multiplier - 1) * 100).toFixed(0)}%` :
                                 timeline.multiplier < 1 ? `-${((1 - timeline.multiplier) * 100).toFixed(0)}%` :
                                 'Standard'}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Support Package */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        5️⃣ Support Package
                      </label>
                      <div className="space-y-2">
                        {supportPackages.map((pkg) => (
                          <motion.button
                            key={pkg.id}
                            onClick={() => handleCalculatorChange('support', pkg.id)}
                            className={`w-full p-3 rounded-lg text-sm font-semibold transition-all duration-300 border-2
                              ${calculatorData.support === pkg.id
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                              }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{pkg.label}</span>
                              <span className="text-xs opacity-80">
                                {pkg.price === 0 ? 'Free' : `+₹${(pkg.price / 1000).toFixed(0)}k`}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column - Summary */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="sticky top-0"
                    >
                      {/* Price Display */}
                      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-2xl">
                        <div className="text-center mb-6">
                          <div className="text-sm opacity-80 mb-2">Estimated Project Cost</div>
                          <motion.div
                            key={estimatedPrice}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl font-bold mb-2"
                          >
                            ₹{estimatedPrice.toLocaleString('en-IN')}
                          </motion.div>
                          <div className="text-xs opacity-80">
                            {calculatorData.serviceType ? '✓ Configuration complete' : '⚠️ Select service type to calculate'}
                          </div>
                        </div>

                        {/* Summary */}
                        {calculatorData.serviceType && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3 text-sm"
                          >
                            <div className="border-t border-white/20 pt-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="opacity-80">Base Service</span>
                                <span className="font-semibold">
                                  ₹{servicesData.find(s => s.title === calculatorData.serviceType)?.basePrice.toLocaleString('en-IN')}
                                </span>
                              </div>
                              
                              {calculatorData.pages > 1 && (
                                <div className="flex justify-between items-center mb-2">
                                  <span className="opacity-80">Additional Pages ({calculatorData.pages - 1})</span>
                                  <span className="font-semibold">
                                    +₹{((calculatorData.pages - 1) * 2000).toLocaleString('en-IN')}
                                  </span>
                                </div>
                              )}
                              
                              {calculatorData.features.length > 0 && (
                                <div className="mb-2">
                                  <div className="opacity-80 mb-1">Features ({calculatorData.features.length})</div>
                                  {calculatorData.features.map(featureId => {
                                    const feature = pricingFeatures.find(f => f.id === featureId);
                                    return feature ? (
                                      <div key={featureId} className="flex justify-between items-center text-xs ml-3 mb-1">
                                        <span className="opacity-70">{feature.icon} {feature.label}</span>
                                        <span>+₹{(feature.price / 1000).toFixed(0)}k</span>
                                      </div>
                                    ) : null;
                                  })}
                                </div>
                              )}
                              
                              {calculatorData.timeline !== 'standard' && (
                                <div className="flex justify-between items-center mb-2">
                                  <span className="opacity-80">Timeline Adjustment</span>
                                  <span className="font-semibold">
                                    {timelines.find(t => t.id === calculatorData.timeline)?.multiplier > 1 ? '+' : ''}
                                    {((timelines.find(t => t.id === calculatorData.timeline)?.multiplier - 1) * 100).toFixed(0)}%
                                  </span>
                                </div>
                              )}
                              
                              {calculatorData.support !== 'basic' && (
                                <div className="flex justify-between items-center mb-2">
                                  <span className="opacity-80">Support Package</span>
                                  <span className="font-semibold">
                                    +₹{supportPackages.find(s => s.id === calculatorData.support)?.price.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 space-y-3">
                        <motion.button
                          onClick={() => {
                            closePricingCalculator();
                            handleConsultation({ 
                              title: calculatorData.serviceType || "General Inquiry",
                              estimatedPrice: estimatedPrice
                            });
                          }}
                          disabled={!calculatorData.serviceType}
                          className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all duration-300
                            ${calculatorData.serviceType
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          whileHover={calculatorData.serviceType ? { scale: 1.02, y: -2 } : {}}
                          whileTap={calculatorData.serviceType ? { scale: 0.98 } : {}}
                        >
                          {calculatorData.serviceType ? '📞 Request Free Consultation' : '⚠️ Select Service First'}
                        </motion.button>

                        <motion.button
                          onClick={handleCallNow}
                          className="w-full py-4 rounded-xl font-bold text-base bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 transition-all duration-300"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          📱 Call Now: +91 98765 43210
                        </motion.button>
                      </div>

                      {/* Disclaimer */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs text-gray-500 text-center mt-4"
                      >
                        💡 This is an estimate. Final price may vary based on specific requirements and complexity.
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CONSULTATION FORM POPUP ================= */}
      <AnimatePresence>
        {showConsultForm && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseForm}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full max-h-[calc(100dvh-var(--navbar-height)-2rem)] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 bg-gradient-to-r ${selectedService?.color || 'from-blue-500 to-purple-600'} text-white relative`}>
                <motion.button
                  onClick={handleCloseForm}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
                
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedService?.icon || "📞"}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-1">
                  Free Consultation
                </h3>
                <p className="text-white/90 text-sm">
                  {selectedService?.title || "Your Project"}
                </p>
                {selectedService?.estimatedPrice && (
                  <p className="text-white/80 text-xs mt-1">
                    Estimated: ₹{selectedService.estimatedPrice.toLocaleString('en-IN')}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="text-xs font-semibold text-gray-700">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-1"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="text-xs font-semibold text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="Your email"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-xs font-semibold text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Your phone number"
                  />
                </motion.div>

                <motion.div
                  className="space-y-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-xs font-semibold text-gray-700">Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 pt-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    className={`flex-1 py-2.5 px-4 rounded-lg text-white font-semibold text-sm
                      bg-gradient-to-r ${selectedService?.color || 'from-blue-500 to-purple-600'} 
                      shadow-lg relative overflow-hidden group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Submit</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={handleCloseForm}
                    className="py-2.5 px-5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </motion.div>

                <motion.p
                  className="text-xs text-gray-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ⏰ We'll contact you within 24 hours
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;

// Stable particle positions keep server and client markup identical.
function particleRandom(index, salt) {
  const value = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}
