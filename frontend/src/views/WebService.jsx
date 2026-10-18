"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= WEB SERVICES DATA ================= */
const webServicesData = [
  {
    title: "Website Development",
    desc: "Modern, responsive, and high-performance websites tailored to your business needs.",
    icon: "🌐",
    features: ["Custom Design", "Mobile Responsive", "SEO Optimized", "Fast Loading"],
    price: "Starting at ₹15,000",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Frontend Development",
    desc: "Interactive UI development using React, Tailwind CSS, and modern JavaScript frameworks.",
    icon: "⚛️",
    features: ["React/Next.js", "Tailwind CSS", "Interactive UI", "Smooth Animations"],
    price: "Starting at ₹12,000",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Backend Development",
    desc: "Secure and scalable backend solutions using Node.js, Express, and REST APIs.",
    icon: "🛠️",
    features: ["Node.js/Express", "REST APIs", "Database Design", "Authentication"],
    price: "Starting at ₹20,000",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Full Stack Development",
    desc: "End-to-end full stack web solutions using MERN stack and best industry practices.",
    icon: "🚀",
    features: ["MERN Stack", "Cloud Deployment", "Scalable Architecture", "Performance"],
    price: "Starting at ₹35,000",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "E-Commerce Solutions",
    desc: "Custom e-commerce platforms with payment gateway, cart, and order management.",
    icon: "🛒",
    features: ["Payment Gateway", "Product Management", "Shopping Cart", "Order Tracking"],
    price: "Starting at ₹25,000",
    color: "from-yellow-500 to-orange-600"
  },
  {
    title: "Website Maintenance",
    desc: "Ongoing support, performance optimization, security updates, and feature enhancements.",
    icon: "🔧",
    features: ["24/7 Support", "Security Updates", "Backup", "Performance Tuning"],
    price: "Starting at ₹5,000/month",
    color: "from-indigo-500 to-blue-600"
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discussion",
    desc: "We discuss your requirements, goals, and budget",
    icon: "💬"
  },
  {
    step: "02",
    title: "Planning",
    desc: "Create project roadmap, wireframes, and tech stack",
    icon: "📋"
  },
  {
    step: "03",
    title: "Design",
    desc: "Design UI/UX with your feedback and approval",
    icon: "🎨"
  },
  {
    step: "04",
    title: "Development",
    desc: "Build your website with clean, efficient code",
    icon: "💻"
  },
  {
    step: "05",
    title: "Testing",
    desc: "Thorough testing across devices and browsers",
    icon: "✅"
  },
  {
    step: "06",
    title: "Launch",
    desc: "Deploy and provide ongoing support",
    icon: "🚀"
  }
];

/* ================= WEB SERVICE PAGE ================= */
const WebService = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { push: navigate } = useRouter();

  const WHATSAPP_NUMBER = "7761980518";
  const WHATSAPP_MESSAGE = "Hello! I'm interested in your web development services. Can you please provide more information?";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = (service = null) => {
    const message = service 
      ? `Hello! I'm interested in your ${service.title} service. Can you please provide more details about pricing and timeline?`
      : WHATSAPP_MESSAGE;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    handleWhatsAppClick(service);
  };

  return (
    <>
      {/* ================= HERO WEB SERVICE SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              🚀 Expert Web Development Services
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Web
            </span>{" "}
            <span className="text-white">Development</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Services
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Powerful, scalable, and user-friendly web solutions built with
            modern technologies. Get a free consultation today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => handleWhatsAppClick()}
              className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-600 hover:to-emerald-700
              transition-all duration-500 hover:scale-110 hover:shadow-2xl
              flex items-center justify-center gap-3"
            >
              <span>📱</span>
              Chat on WhatsApp
            </button>
            
            <button
              onClick={() => {
                document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110"
            >
              View Services
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "35+", label: "Happy Clients" },
              { number: "2+", label: "Years Experience" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-1000 delay-${index * 200} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK CONTACT BAR ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-semibold flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span>Need help? Chat with us on WhatsApp for instant response!</span>
          </div>
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-8 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-xl"
          >
            <span>💬</span>
            Chat Now
          </button>
        </div>
      </div>

      {/* ================= WEB SERVICES GRID ================= */}
      <section id="services-grid" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Web Services</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We create web solutions that deliver performance, security,
              scalability, and business growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {webServicesData.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl
                transition-all duration-700 hover:-translate-y-4 cursor-pointer
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => handleServiceClick(service)}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {service.icon}
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {service.price}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                    className="w-full py-4 px-6 rounded-xl text-white font-bold
                    bg-gradient-to-r from-green-500 to-emerald-600
                    hover:from-green-600 hover:to-emerald-700
                    transform hover:-translate-y-1 transition-all duration-300
                    flex items-center justify-center gap-2"
                  >
                    <span>📱</span>
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Process</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              A simple and transparent process to bring your vision to life
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 relative group hover:bg-slate-700 transition-all duration-500">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Us?</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We combine technical expertise with creative design to deliver websites that not only look great but also perform exceptionally well.
              </p>

              <div className="space-y-4">
                {[
                  "✅ 100% Client Satisfaction Guarantee",
                  "✅ Modern Technology Stack (React, Node.js, MongoDB)",
                  "✅ SEO Optimized Websites",
                  "✅ Free 1 Month Maintenance",
                  "✅ 24/7 Support via WhatsApp",
                  "✅ Affordable Pricing with No Hidden Costs"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleWhatsAppClick()}
                className="mt-8 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>📱</span>
                Get Free Consultation on WhatsApp
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Quick Quote</h3>
              <p className="mb-6 text-white/90">Send us a message on WhatsApp for instant response</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <span>+91 {WHATSAPP_NUMBER}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <span>Response within 5 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <span>Available 24/7 on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Clients Say</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Don't just take our word for it — hear from our satisfied clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                company: "TechStart",
                text: "Excellent work! They delivered our e-commerce website on time and within budget. Highly recommended!",
                rating: 5
              },
              {
                name: "Priya Patel",
                company: "Creative Agency",
                text: "Very professional team. They understood our requirements perfectly and delivered a beautiful website.",
                rating: 5
              },
              {
                name: "Amit Kumar",
                company: "Local Business",
                text: "Great communication throughout the project. The website looks amazing and loads super fast!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="flex text-yellow-400 mb-4">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Questions</span>
            </h2>
            <p className="text-gray-600">Get answers to common questions about our web services</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does it take to build a website?",
                a: "Timeline varies based on complexity. A basic business website takes 2-3 weeks, while e-commerce sites may take 4-6 weeks. Contact us on WhatsApp for a personalized timeline."
              },
              {
                q: "Do you provide website maintenance?",
                a: "Yes! We offer monthly maintenance packages including updates, backups, security patches, and 24/7 support via WhatsApp."
              },
              {
                q: "What is your pricing model?",
                a: "We offer transparent pricing with no hidden costs. Contact us on WhatsApp for a free quote based on your specific requirements."
              },
              {
                q: "Do you offer revisions?",
                a: "Yes, we offer unlimited revisions during the development phase to ensure you're completely satisfied with the result."
              },
              {
                q: "How can I contact you for support?",
                a: "The fastest way to reach us is via WhatsApp at +91 7761980518. We typically respond within 5-10 minutes."
              }
            ].map((item, index) => {
              const [open, setOpen] = useState(false);
              return (
                <div
                  key={index}
                  onClick={() => setOpen(!open)}
                  className="bg-gray-50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.q}
                    </h4>
                    <span className={`text-2xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      open ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build Your Website?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Let's discuss your project on WhatsApp. Get a free quote within minutes!
          </p>
          
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-green-600 rounded-full
            hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl
            flex items-center justify-center gap-3 mx-auto"
          >
            <span className="text-2xl">📱</span>
            Chat on WhatsApp Now
          </button>
          
          <p className="text-white/80 mt-4 text-sm">
            or call us directly: +91 {WHATSAPP_NUMBER}
          </p>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default WebService;