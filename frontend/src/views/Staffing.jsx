"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const staffingServices = [
  {
    title: "IT Staffing",
    desc: "Skilled frontend, backend, full-stack, and DevOps professionals for your business needs.",
    icon: "💻",
    features: ["Frontend Developers", "Backend Engineers", "Full Stack Experts", "DevOps Engineers"],
    hiringModels: ["Contract", "Permanent", "Remote"],
    price: "Custom Quote",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Contract Staffing",
    desc: "Flexible contract-based hiring solutions to scale your team quickly and efficiently.",
    icon: "📄",
    features: ["Short-term Projects", "Seasonal Hiring", "Project-based", "Quick Onboarding"],
    hiringModels: ["3-6 Months", "6-12 Months", "Extendable"],
    price: "Starting ₹25,000/month",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Permanent Staffing",
    desc: "End-to-end recruitment solutions to hire full-time professionals who fit your culture.",
    icon: "🏢",
    features: ["Executive Search", "Mid-level Hiring", "Entry Level", "Culture Fit"],
    hiringModels: ["Full-time", "Permanent", "Benefits Included"],
    price: "8-12% of CTC",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Remote Staffing",
    desc: "Hire top remote talent globally with complete technical and HR support.",
    icon: "🌍",
    features: ["Global Talent Pool", "Time Zone Matched", "Remote Management", "HR Support"],
    hiringModels: ["Work from Home", "Hybrid", "Any Location"],
    price: "Starting ₹20,000/month",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Technical Screening",
    desc: "Expert-level screening, interviews, and skill validation to ensure quality hiring.",
    icon: "🧪",
    features: ["Technical Assessments", "Live Coding", "Architecture Review", "Soft Skills"],
    hiringModels: ["One-time", "Bulk Hiring", "On-demand"],
    price: "Starting ₹5,000/candidate",
    color: "from-indigo-500 to-blue-600"
  },
  {
    title: "Payroll & HR Support",
    desc: "Complete payroll management, compliance, and HR support for hired resources.",
    icon: "🧾",
    features: ["Salary Processing", "Tax Compliance", "Benefits Admin", "HR Support"],
    hiringModels: ["Monthly", "Annual Contract"],
    price: "Custom Quote",
    color: "from-yellow-500 to-orange-600"
  },
];

const talentCategories = [
  {
    category: "Frontend Developers",
    skills: ["React", "Vue.js", "Angular", "Next.js", "TypeScript"],
    icon: "⚛️"
  },
  {
    category: "Backend Developers",
    skills: ["Node.js", "Python", "Java", "Go", ".NET"],
    icon: "⚙️"
  },
  {
    category: "Full Stack Engineers",
    skills: ["MERN", "MEAN", "JAMstack", "LAMP", "Serverless"],
    icon: "🚀"
  },
  {
    category: "DevOps Engineers",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
    icon: "🔧"
  },
  {
    category: "Mobile Developers",
    skills: ["React Native", "Flutter", "iOS", "Android", "Kotlin"],
    icon: "📱"
  },
  {
    category: "UI/UX Designers",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    icon: "🎨"
  }
];

const whyChooseUs = [
  {
    icon: "⚡",
    title: "48-Hour Matching",
    desc: "Get pre-vetted candidates within 48 hours of your requirement"
  },
  {
    icon: "✅",
    title: "Pre-Vetted Talent",
    desc: "All candidates go through technical & HR screening before you see them"
  },
  {
    icon: "🔄",
    title: "Free Replacement",
    desc: "90-day free replacement guarantee for permanent hires"
  },
  {
    icon: "💰",
    title: "Cost Effective",
    desc: "Competitive pricing with no hidden costs or fees"
  },
  {
    icon: "🤝",
    title: "Dedicated Account Manager",
    desc: "Single point of contact for all your hiring needs"
  },
  {
    icon: "📊",
    title: "Talent Pool of 5000+",
    desc: "Access to a vast network of pre-screened professionals"
  }
];

const Staffing = () => {
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
      ? `Hello! I'm interested in your ${service.title} staffing service. I need to hire talent for my company. Can you provide more details?`
      : "Hello! I need staffing solutions for my company. Can you help me find the right talent?";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    handleWhatsAppClick(service);
  };

  return (
    <>
      {/* ================= HERO STAFFING SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/business/staffing.420ee3f1e737.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              🤝 Find Your Perfect Team Members
            </span> */}
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Smart
            </span>{" "}
            <span className="text-white">Staffing</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Solutions
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Connecting businesses with the right talent to drive growth,
            performance, and innovation. Find pre-vetted professionals in 48 hours.
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
              Hire Talent Now
            </button>
            
            <button
              onClick={() => {
                document.getElementById('staffing-services').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110"
            >
              Explore Services
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20">
            {[
              { number: "5000+", label: "Talent Pool" },
              { number: "48h", label: "Avg. Matching Time" },
              { number: "200+", label: "Companies Served" },
              { number: "95%", label: "Retention Rate" },
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
            <span className="text-2xl">🤝</span>
            <span>Need to hire urgently? Get pre-vetted candidates in 48 hours!</span>
          </div>
          <button
            onClick={() => handleWhatsAppClick()}
            className="px-8 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-xl"
          >
            <span>💬</span>
            Post Your Requirement
          </button>
        </div>
      </div>

      {/* ================= STAFFING SERVICES ================= */}
      <section id="staffing-services" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Staffing Services</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We provide flexible and reliable staffing solutions tailored to
              your business requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffingServices.map((service, index) => (
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
                    {service.hiringModels.map((model, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                        {model}
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
                    Hire Talent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TALENT CATEGORIES ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Categories</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Find experts across various technologies and domains
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {talentCategories.map((category, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-700 text-blue-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HIRING PROCESS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Hiring Process</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Simple, transparent, and fast process to get you the right talent
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Share Requirements", desc: "Tell us about your technical and cultural requirements", icon: "📝" },
              { step: "02", title: "We Source & Screen", desc: "We find and vet candidates matching your needs", icon: "🔍" },
              { step: "03", title: "You Interview", desc: "Interview pre-vetted candidates of your choice", icon: "🤝" },
              { step: "04", title: "Hire & Onboard", desc: "Select the best fit and onboard quickly", icon: "🚀" }
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 sm:p-8 group-hover:shadow-xl transition-all duration-500">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Our Staffing?</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We focus on speed, quality, and long-term partnerships to deliver the best talent solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLIENTS & TESTIMONIALS ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Clients Say</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Trusted by 200+ companies for their staffing needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                company: "TechSolutions Inc.",
                text: "They provided excellent React developers within a week. Very professional and responsive team.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                company: "StartupHub",
                text: "Their contract staffing helped us scale quickly. The candidates were well-vetted and skilled.",
                rating: 5
              },
              {
                name: "Amit Patel",
                company: "Digital Agency",
                text: "Great experience with their permanent staffing service. Found us the perfect full-stack developer.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-5 sm:p-8 hover:bg-slate-700 transition-all duration-500">
                <div className="flex text-yellow-400 mb-4">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Get pre-vetted candidates in 48 hours. Free consultation on your hiring needs!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => handleWhatsAppClick()}
              className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-green-600 rounded-full
              hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl
              flex items-center justify-center gap-3 mx-auto"
            >
              <span className="text-2xl">📱</span>
              Post Your Requirement
            </button>
            
            <button
              onClick={() => window.location.href = "mailto:hr@yourcompany.com"}
              className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold text-white border-2 border-white rounded-full
              hover:bg-white hover:text-blue-600 transition-all duration-500 hover:scale-110"
            >
              Email Us
            </button>
          </div>
          
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

export default Staffing;