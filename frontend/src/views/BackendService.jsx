"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= BACKEND SERVICES DATA ================= */
const backendServicesData = [
  {
    title: "Node.js Backend Development",
    desc: "High-performance backend development using Node.js and Express for scalable applications.",
    icon: "🟢",
    features: ["Express.js Framework", "RESTful APIs", "Real-time Apps", "Microservices"],
    technologies: ["Node.js", "Express", "Socket.io", "PM2"],
    price: "Starting ₹25,000",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Database Design & Management",
    desc: "Efficient database design using MongoDB, MySQL, and PostgreSQL with optimized queries.",
    icon: "🗄️",
    features: ["Schema Design", "Query Optimization", "Indexing", "Data Migration"],
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    price: "Starting ₹20,000",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Authentication & Authorization",
    desc: "Secure login systems using JWT, OAuth, role-based access control, and encryption.",
    icon: "🔐",
    features: ["JWT Tokens", "OAuth 2.0", "RBAC", "Password Encryption"],
    technologies: ["JWT", "Passport.js", "Bcrypt", "OAuth"],
    price: "Starting ₹15,000",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "REST API Development",
    desc: "Robust RESTful APIs to connect frontend, mobile apps, and third-party services.",
    icon: "🔗",
    features: ["API Design", "Documentation", "Versioning", "Rate Limiting"],
    technologies: ["REST", "Swagger", "Postman", "OpenAPI"],
    price: "Starting ₹18,000",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Microservices Architecture",
    desc: "Scalable backend systems built with microservices and service-oriented architecture.",
    icon: "🧩",
    features: ["Service Decomposition", "Message Queues", "Docker", "Kubernetes"],
    technologies: ["Docker", "Kafka", "RabbitMQ", "K8s"],
    price: "Custom Quote",
    color: "from-indigo-500 to-blue-600"
  },
  {
    title: "Server & Performance Optimization",
    desc: "Backend performance tuning, caching, load balancing, and server optimization.",
    icon: "⚙️",
    features: ["Load Balancing", "Caching", "Monitoring", "Auto-scaling"],
    technologies: ["Redis", "Nginx", "AWS", "Grafana"],
    price: "Starting ₹22,000",
    color: "from-yellow-500 to-orange-600"
  },
];

const backendTechStack = [
  {
    category: "Runtime",
    technologies: ["Node.js", "Deno", "Bun"]
  },
  {
    category: "Frameworks",
    technologies: ["Express.js", "Nest.js", "Fastify", "Koa"]
  },
  {
    category: "Databases",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis"]
  },
  {
    category: "DevOps",
    technologies: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  }
];

const backendBenefits = [
  {
    icon: "🚀",
    title: "High Performance",
    desc: "Optimized code and caching strategies for lightning-fast responses"
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "Advanced security measures to protect your data and systems"
  },
  {
    icon: "📈",
    title: "Scalable Architecture",
    desc: "Build systems that grow seamlessly with your user base"
  },
  {
    icon: "🛡️",
    title: "99.9% Uptime",
    desc: "Reliable infrastructure with minimal downtime"
  },
  {
    icon: "🔧",
    title: "Easy Maintenance",
    desc: "Clean code architecture for hassle-free updates"
  },
  {
    icon: "⚡",
    title: "Quick Development",
    desc: "Rapid development with modern tools and practices"
  }
];

/* ================= BACKEND SERVICE PAGE ================= */
const BackendService = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { push: navigate } = useRouter();

  const WHATSAPP_NUMBER = "7761980518";

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
      ? `Hello! I'm interested in your ${service.title} backend service. Can you provide more details about implementation and pricing?`
      : "Hello! I need backend development services for my project. Can you help me?";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    handleWhatsAppClick(service);
  };

  return (
    <>
      {/* ================= HERO BACKEND SERVICE SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              ⚡ Powerful & Scalable Backend Solutions
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Backend
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
            Secure, scalable, and high-performance backend solutions that power
            modern applications. Get expert Node.js developers for your project.
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
              Chat with Backend Expert
            </button>
            
            <button
              onClick={() => {
                document.getElementById('backend-services').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110"
            >
              Explore Services
            </button>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS"].map((tech, index) => (
              <span key={index} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK CONTACT BAR ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-semibold flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Need a scalable backend? Chat with our Node.js experts!</span>
          </div>
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-8 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-xl"
          >
            <span>💬</span>
            Get Free Consultation
          </button>
        </div>
      </div>

      {/* ================= BACKEND SERVICES GRID ================= */}
      <section id="backend-services" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Backend Services</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We build reliable backend systems that ensure security,
              scalability, and smooth application performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendServicesData.map((service, index) => (
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
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                        {tech}
                      </span>
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
                    Discuss on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECH STACK SECTION ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Tech Stack</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              We use modern, proven technologies to build robust backend systems
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {backendTechStack.map((stack, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-4 text-center">{stack.category}</h3>
                <div className="space-y-3">
                  {stack.technologies.map((tech, idx) => (
                    <div key={idx} className="bg-slate-700 rounded-lg p-3 text-center text-white font-semibold">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BACKEND BENEFITS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Why Choose Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Backend Services?</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We deliver backend solutions that are built to last and scale
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-5 sm:p-8 hover:shadow-xl transition-all duration-500 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE PATTERNS ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                Modern <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Architecture</span> Patterns
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We implement industry-best architecture patterns to ensure your backend is scalable, maintainable, and performant.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "MVC Architecture",
                    desc: "Clean separation of concerns with Model-View-Controller pattern"
                  },
                  {
                    title: "Microservices",
                    desc: "Independent, scalable services for complex applications"
                  },
                  {
                    title: "Event-Driven Architecture",
                    desc: "Real-time, asynchronous communication between services"
                  },
                  {
                    title: "Serverless",
                    desc: "Cost-effective, auto-scaling functions for specific tasks"
                  }
                ].map((pattern, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{pattern.title}</h3>
                      <p className="text-gray-600">{pattern.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Free Backend Consultation</h3>
              <p className="mb-8 text-white/90">
                Get expert advice on your backend architecture, technology selection, and scalability planning.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <span>Architecture Review</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span>Cost Estimation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span>Scalability Planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span>WhatsApp: +91 {WHATSAPP_NUMBER}</span>
                </div>
              </div>
              <button
                onClick={() => handleWhatsAppClick()}
                className="mt-8 w-full py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Backend <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Use Cases</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Real-world solutions we've built for our clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                desc: "Scalable backend for online store with inventory management",
                tech: "Node.js, MongoDB, Redis",
                result: "Handles 10K+ concurrent users"
              },
              {
                title: "Social Media App",
                desc: "Real-time messaging and notification system",
                tech: "Node.js, Socket.io, PostgreSQL",
                result: "< 100ms response time"
              },
              {
                title: "SaaS Dashboard",
                desc: "Multi-tenant architecture with role-based access",
                tech: "Nest.js, MySQL, Redis",
                result: "99.9% uptime"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-400 mb-4">{useCase.desc}</p>
                <p className="text-blue-400 text-sm mb-2">Tech: {useCase.tech}</p>
                <p className="text-green-400 font-semibold">✓ {useCase.result}</p>
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
              Backend <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">FAQs</span>
            </h2>
            <p className="text-gray-600">Common questions about backend development</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Which backend technology is best for my project?",
                a: "It depends on your requirements. We recommend Node.js for most projects due to its performance and scalability. Contact us on WhatsApp for personalized advice."
              },
              {
                q: "How long does it take to build a backend?",
                a: "Timeline varies based on complexity. A basic REST API takes 2-3 weeks, while complex microservices may take 2-3 months."
              },
              {
                q: "Do you provide API documentation?",
                a: "Yes, we provide comprehensive API documentation using Swagger/OpenAPI standards."
              },
              {
                q: "How do you ensure backend security?",
                a: "We implement multiple security layers including input validation, encryption, rate limiting, and regular security audits."
              },
              {
                q: "Do you offer post-launch support?",
                a: "Absolutely! We provide maintenance packages including bug fixes, updates, and 24/7 monitoring."
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
            Ready to Build Your Backend?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Get expert backend developers for your project. Free consultation available!
          </p>
          
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-green-600 rounded-full
            hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl
            flex items-center justify-center gap-3 mx-auto"
          >
            <span className="text-2xl">📱</span>
            Chat with Backend Expert
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

export default BackendService;