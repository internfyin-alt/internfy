"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= API SERVICES DATA ================= */
const apiServicesData = [
  {
    title: "REST API Development",
    desc: "Robust and scalable RESTful APIs for web and mobile applications with best practices.",
    icon: "🔗",
    features: ["CRUD Operations", "API Versioning", "Rate Limiting", "Response Caching"],
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    price: "Starting ₹20,000",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "GraphQL API Development",
    desc: "Flexible and high-performance GraphQL APIs for modern applications with efficient data fetching.",
    icon: "📊",
    features: ["Schema Design", "Resolvers", "Subscriptions", "Query Optimization"],
    technologies: ["GraphQL", "Apollo", "Node.js", "Prisma"],
    price: "Starting ₹25,000",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Third-Party API Integration",
    desc: "Seamless integration with payment gateways, SMS, email, and external services.",
    icon: "🔌",
    features: ["Payment Gateways", "Social Media", "Maps Services", "Email/SMS"],
    technologies: ["Razorpay", "Stripe", "Twilio", "Google APIs"],
    price: "Starting ₹15,000",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "API Security",
    desc: "Secure APIs with authentication, authorization, JWT, OAuth, and encryption.",
    icon: "🔐",
    features: ["JWT Tokens", "OAuth 2.0", "API Keys", "Rate Limiting"],
    technologies: ["JWT", "OAuth", "HTTPS", "Encryption"],
    price: "Starting ₹18,000",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Microservices Architecture",
    desc: "Design and development of scalable microservices-based systems with service discovery.",
    icon: "🧩",
    features: ["Service Decomposition", "Message Queues", "API Gateway", "Service Discovery"],
    technologies: ["Docker", "Kubernetes", "Kafka", "gRPC"],
    price: "Custom Quote",
    color: "from-indigo-500 to-blue-600"
  },
  {
    title: "API Testing & Documentation",
    desc: "Well-documented APIs with comprehensive testing using Postman, Swagger, and automation.",
    icon: "🧪",
    features: ["Swagger/OpenAPI", "Postman Collections", "Unit Testing", "Load Testing"],
    technologies: ["Swagger", "Postman", "Jest", "JMeter"],
    price: "Starting ₹12,000",
    color: "from-yellow-500 to-orange-600"
  },
];

const apiTypes = [
  {
    type: "REST APIs",
    icon: "🔗",
    desc: "Traditional, stateless APIs following REST principles",
    useCase: "Ideal for standard CRUD operations"
  },
  {
    type: "GraphQL APIs",
    icon: "📊",
    desc: "Flexible queries, get exactly what you need",
    useCase: "Complex data requirements, mobile apps"
  },
  {
    type: "WebSocket APIs",
    icon: "🔄",
    desc: "Real-time bidirectional communication",
    useCase: "Chat apps, live notifications"
  },
  {
    type: "gRPC APIs",
    icon: "⚡",
    desc: "High-performance RPC framework",
    useCase: "Microservices communication"
  }
];

const apiBenefits = [
  {
    icon: "🚀",
    title: "High Performance",
    desc: "Optimized APIs with response times under 100ms"
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "Multiple security layers to protect your data"
  },
  {
    icon: "📈",
    title: "Scalable Architecture",
    desc: "Handle millions of requests effortlessly"
  },
  {
    icon: "📚",
    title: "Complete Documentation",
    desc: "Detailed API docs with examples and guides"
  },
  {
    icon: "🧪",
    title: "Thorough Testing",
    desc: "Comprehensive test coverage and validation"
  },
  {
    icon: "⚙️",
    title: "Easy Integration",
    desc: "Developer-friendly APIs with SDK support"
  }
];

/* ================= API SERVICE PAGE ================= */
const APIService = () => {
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
      ? `Hello! I'm interested in your ${service.title} API service. Can you provide more details about implementation and pricing?`
      : "Hello! I need API development services for my project. Can you help me?";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    handleWhatsAppClick(service);
  };

  return (
    <>
      {/* ================= HERO API SERVICE SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              🔌 Connect Your Applications with Powerful APIs
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              API
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
            Secure, scalable, and high-performance APIs powering modern digital
            applications. Get custom APIs tailored to your needs.
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
              Chat with API Expert
            </button>
            
            <button
              onClick={() => {
                document.getElementById('api-services').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110"
            >
              Explore Services
            </button>
          </div>

          {/* API Type Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {["REST", "GraphQL", "WebSocket", "gRPC", "SOAP", "OData"].map((type, index) => (
              <span key={index} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK CONTACT BAR ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-semibold flex items-center gap-2">
            <span className="text-2xl">🔌</span>
            <span>Need custom APIs? Chat with our API development experts!</span>
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

      {/* ================= API SERVICES GRID ================= */}
      <section id="api-services" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">API Services</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We build powerful APIs that ensure seamless communication
              between systems and applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apiServicesData.map((service, index) => (
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

      {/* ================= API TYPES SECTION ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              API <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Types</span> We Specialize In
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Choose the right API architecture for your needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {apiTypes.map((type, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{type.type}</h3>
                <p className="text-slate-400 text-sm mb-4">{type.desc}</p>
                <p className="text-blue-400 text-sm font-semibold">{type.useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= API BENEFITS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Why Choose Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">API Services?</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We deliver APIs that are built to last and scale with your business
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apiBenefits.map((benefit, index) => (
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

      {/* ================= INTEGRATION EXAMPLES ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                Seamless <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Third-Party</span> Integrations
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We integrate with popular third-party services to extend your application's functionality.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Razorpay", icon: "💰" },
                  { name: "Stripe", icon: "💳" },
                  { name: "Twilio", icon: "📱" },
                  { name: "SendGrid", icon: "📧" },
                  { name: "Google Maps", icon: "🗺️" },
                  { name: "Firebase", icon: "🔥" },
                  { name: "AWS", icon: "☁️" },
                  { name: "Stripe", icon: "💳" }
                ].map((integration, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-md">
                    <span className="text-2xl">{integration.icon}</span>
                    <span className="font-semibold">{integration.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Free API Consultation</h3>
              <p className="mb-8 text-white/90">
                Get expert advice on API design, technology selection, and integration strategy.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <span>API Architecture Review</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span>Cost & Timeline Estimation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔒</span>
                  <span>Security Assessment</span>
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
              API <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Use Cases</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Real-world API solutions we've delivered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Payment Gateway API",
                desc: "Secure API for processing payments with multiple providers",
                tech: "REST, JWT, Encryption",
                result: "Processed ₹10Cr+ transactions"
              },
              {
                title: "E-commerce API",
                desc: "Complete backend API for online store operations",
                tech: "GraphQL, Node.js, MongoDB",
                result: "Supports 50K+ products"
              },
              {
                title: "SMS/Email API",
                desc: "High-throughput messaging API for notifications",
                tech: "REST, RabbitMQ, Redis",
                result: "1M+ messages/month"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500">
                <div className="text-4xl mb-4">🔌</div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-400 mb-4">{useCase.desc}</p>
                <p className="text-blue-400 text-sm mb-2">Tech: {useCase.tech}</p>
                <p className="text-green-400 font-semibold">✓ {useCase.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= API STANDARDS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              API <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Best Practices</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We follow industry standards and best practices for all our APIs
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "RESTful Principles",
              "GraphQL Best Practices",
              "OpenAPI/Swagger",
              "Semantic Versioning",
              "Rate Limiting",
              "Pagination",
              "Caching Strategies",
              "Error Handling",
              "Request Validation",
              "Response Standardization"
            ].map((standard, index) => (
              <div key={index} className="bg-blue-50 text-blue-700 px-6 py-3 rounded-full font-semibold">
                {standard}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              API <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">FAQs</span>
            </h2>
            <p className="text-gray-600">Common questions about API development</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What's the difference between REST and GraphQL?",
                a: "REST uses multiple endpoints for different resources, while GraphQL uses a single endpoint with flexible queries. We'll help you choose the best option for your project."
              },
              {
                q: "How do you ensure API security?",
                a: "We implement multiple security layers including authentication (JWT/OAuth), rate limiting, input validation, HTTPS, and regular security audits."
              },
              {
                q: "Do you provide API documentation?",
                a: "Yes, we provide comprehensive documentation using Swagger/OpenAPI with interactive testing interfaces."
              },
              {
                q: "How long does API development take?",
                a: "Timeline varies based on complexity. Simple REST APIs take 1-2 weeks, while complex systems may take 4-6 weeks."
              },
              {
                q: "Can you integrate with existing systems?",
                a: "Absolutely! We specialize in integrating with legacy systems and third-party services. Contact us on WhatsApp to discuss your specific needs."
              }
            ].map((item, index) => {
              const [open, setOpen] = useState(false);
              return (
                <div
                  key={index}
                  onClick={() => setOpen(!open)}
                  className="bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
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
            Ready to Build Your API?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Get custom API development services tailored to your needs. Free consultation available!
          </p>
          
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-green-600 rounded-full
            hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl
            flex items-center justify-center gap-3 mx-auto"
          >
            <span className="text-2xl">📱</span>
            Chat with API Expert
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

export default APIService;