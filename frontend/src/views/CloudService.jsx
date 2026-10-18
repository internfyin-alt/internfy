"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= CLOUD SERVICES DATA ================= */
const cloudServicesData = [
  {
    title: "Cloud Consulting",
    desc: "Expert guidance to choose the right cloud strategy, architecture, and services for your business.",
    icon: "☁️",
    features: ["Cloud Strategy", "Architecture Design", "Cost Optimization", "Vendor Selection"],
    price: "Custom Quote",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "AWS Cloud Services",
    desc: "Scalable and secure cloud solutions using Amazon Web Services for modern applications.",
    icon: "🟧",
    features: ["EC2 & Lambda", "S3 Storage", "RDS Databases", "VPC Networking"],
    price: "Pay as you go",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Azure Cloud Services",
    desc: "Enterprise-grade cloud solutions using Microsoft Azure with high availability and security.",
    icon: "🔵",
    features: ["Virtual Machines", "Azure Functions", "SQL Azure", "Active Directory"],
    price: "Custom Quote",
    color: "from-blue-600 to-indigo-700"
  },
  {
    title: "Cloud Migration",
    desc: "Seamless migration of applications, data, and infrastructure to the cloud with minimal downtime.",
    icon: "🚀",
    features: ["Lift & Shift", "Re-platforming", "Data Migration", "Zero Downtime"],
    price: "Project based",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "DevOps & CI/CD",
    desc: "Automated deployments, CI/CD pipelines, and infrastructure as code for faster delivery.",
    icon: "⚙️",
    features: ["CI/CD Pipelines", "Infrastructure as Code", "Monitoring", "Automation"],
    price: "Starting ₹50,000",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Cloud Security & Monitoring",
    desc: "Advanced security, monitoring, and cost optimization for cloud infrastructure.",
    icon: "🔐",
    features: ["Security Audits", "Threat Detection", "Cost Monitoring", "Compliance"],
    price: "Starting ₹35,000",
    color: "from-yellow-500 to-orange-600"
  },
];

const cloudBenefits = [
  {
    icon: "💰",
    title: "Cost Effective",
    desc: "Pay only for what you use with optimal resource allocation"
  },
  {
    icon: "🚀",
    title: "High Scalability",
    desc: "Scale resources up or down based on demand automatically"
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "Advanced security features and compliance standards"
  },
  {
    icon: "⏱️",
    title: "High Availability",
    desc: "99.9% uptime guarantee with multi-region deployment"
  },
  {
    icon: "🌍",
    title: "Global Reach",
    desc: "Deploy applications closer to your users worldwide"
  },
  {
    icon: "🔄",
    title: "Disaster Recovery",
    desc: "Automated backups and quick recovery options"
  }
];

const cloudProviders = [
  {
    name: "Amazon Web Services",
    icon: "🟧",
    services: ["EC2", "S3", "Lambda", "RDS", "VPC"],
    expert: true
  },
  {
    name: "Microsoft Azure",
    icon: "🔵",
    services: ["VMs", "Functions", "SQL", "AD", "Blob"],
    expert: true
  },
  {
    name: "Google Cloud",
    icon: "🟢",
    services: ["Compute", "Storage", "Functions", "Kubernetes"],
    expert: true
  }
];

/* ================= CLOUD SERVICE PAGE ================= */
const CloudService = () => {
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
      ? `Hello! I'm interested in your ${service.title} cloud service. Can you provide more details about pricing and implementation?`
      : "Hello! I'm interested in your cloud services. Can you provide more information about cloud solutions for my business?";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    handleWhatsAppClick(service);
  };

  return (
    <>
      {/* ================= HERO CLOUD SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              ☁️ Enterprise Cloud Solutions
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Cloud
            </span>{" "}
            <span className="text-white">Computing</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Services
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Secure, scalable, and high-performance cloud solutions to accelerate
            your digital transformation. Get expert guidance from certified cloud architects.
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
              Chat with Cloud Expert
            </button>
            
            <button
              onClick={() => {
                document.getElementById('cloud-services').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110"
            >
              Explore Services
            </button>
          </div>

          {/* Cloud Provider Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {cloudProviders.map((provider, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3">
                <span className="text-2xl">{provider.icon}</span>
                <span className="text-white font-semibold">{provider.name}</span>
                {provider.expert && (
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">Expert</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK CONTACT BAR ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-semibold flex items-center gap-2">
            <span className="text-2xl">☁️</span>
            <span>Need cloud architecture advice? Chat with our certified experts!</span>
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

      {/* ================= CLOUD SERVICES GRID ================= */}
      <section id="cloud-services" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Cloud Services</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We deliver cloud-native solutions that improve scalability,
              security, and operational efficiency.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cloudServicesData.map((service, index) => (
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

      {/* ================= CLOUD BENEFITS ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Benefits of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Cloud Computing</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Why businesses are moving to the cloud with our expertise
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cloudBenefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOUD PROVIDERS DETAIL ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Cloud <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Providers</span> We Work With
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Multi-cloud expertise across leading platforms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cloudProviders.map((provider, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-5 sm:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="text-7xl mb-4">{provider.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{provider.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {provider.services.map((service, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleWhatsAppClick()}
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Get Expert Advice →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                Why Choose Us for <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Cloud Services?</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We're certified cloud experts with years of experience in architecting and managing cloud infrastructure.
              </p>

              <div className="space-y-4">
                {[
                  "✅ Certified AWS & Azure Experts",
                  "✅ 50+ Successful Cloud Migrations",
                  "✅ 99.9% Uptime Guarantee",
                  "✅ 24/7 Cloud Monitoring & Support",
                  "✅ Cost Optimization Strategies",
                  "✅ Free Cloud Assessment"
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
                Get Free Cloud Assessment
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Free Cloud Assessment</h3>
              <p className="mb-6 text-white/90">Get a comprehensive analysis of your current infrastructure and recommendations</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <span>Infrastructure Audit</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span>Cost Optimization Report</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Cloud <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Use Cases</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              How we've helped businesses transform with cloud
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                desc: "Scalable infrastructure for peak shopping seasons",
                result: "200% traffic handled, zero downtime"
              },
              {
                title: "SaaS Application",
                desc: "Multi-tenant architecture on AWS",
                result: "40% cost reduction, auto-scaling"
              },
              {
                title: "Enterprise Migration",
                desc: "Lift and shift of legacy applications",
                result: "99.9% uptime, 50% cost savings"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-400 mb-4">{useCase.desc}</p>
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
              Cloud <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">FAQs</span>
            </h2>
            <p className="text-gray-600">Common questions about cloud services</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Which cloud provider is best for my business?",
                a: "It depends on your specific needs. We provide free consultation to help you choose between AWS, Azure, or GCP based on your requirements, budget, and technical expertise."
              },
              {
                q: "How much does cloud migration cost?",
                a: "Costs vary based on complexity. Contact us on WhatsApp for a free assessment and detailed quote tailored to your infrastructure."
              },
              {
                q: "Is cloud secure for my business data?",
                a: "Yes, with proper configuration. We implement enterprise-grade security including encryption, access controls, and regular security audits."
              },
              {
                q: "How long does cloud migration take?",
                a: "Timeline varies from weeks to months depending on complexity. We ensure minimal downtime during migration."
              },
              {
                q: "Do you provide post-migration support?",
                a: "Absolutely! We offer 24/7 monitoring, maintenance, and optimization services for all our cloud solutions."
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
            Ready to Move to the Cloud?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Get expert guidance from certified cloud architects. Free consultation available!
          </p>
          
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-green-600 rounded-full
            hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl
            flex items-center justify-center gap-3 mx-auto"
          >
            <span className="text-2xl">📱</span>
            Chat with Cloud Expert
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

export default CloudService;