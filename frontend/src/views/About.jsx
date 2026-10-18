"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= FAQ ITEM COMPONENT ================= */
const FAQItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100"
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
};

/* ================= TEAM MEMBER CARD ================= */
const TeamMember = ({ name, role, bio, image, social }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl text-white transform group-hover:scale-110 transition-transform duration-500">
          {image}
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {social.map((icon, idx) => (
            <a key={idx} href={icon.link} className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold text-center mb-1">{name}</h3>
      <p className="text-blue-600 text-center mb-3">{role}</p>
      <p className="text-gray-600 text-center text-sm">{bio}</p>
    </div>
  );
};

/* ================= ABOUT PAGE ================= */
const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const { push: navigate } = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= HERO ABOUT SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/business/bg.cfd21d24e7fe.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              Welcome to Our Digital Agency
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              We Build
            </span>{" "}
            <span className="text-white">Digital</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Dreams
            </span>
          </h1>

          <h2
            className={`text-2xl md:text-3xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            We're a team of passionate developers, designers, and creators dedicated to building exceptional digital experiences that help businesses grow.
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className={`px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
              transition-all duration-500 hover:scale-110 hover:shadow-2xl
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Work With Us
            </button>
            
            <button
              onClick={() => {
                document.getElementById('about-content').scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "35+", label: "Happy Clients" },
              { number: "4.9", label: "Client Rating" },
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

      {/* ================= ABOUT CONTENT TABS ================= */}
      <section id="about-content" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center gap-1 bg-gray-100 rounded-2xl sm:rounded-full p-1">
              {[
                { id: "story", label: "Our Story" },
                { id: "mission", label: "Mission & Vision" },
                { id: "values", label: "Our Values" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-8 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {activeTab === "story" && (
                <>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                    Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Story</span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Founded in 2023, we started with a simple mission: to help businesses establish a powerful online presence. What began as a small team of two developers has grown into a full-service digital agency serving clients across India and beyond.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    We believe that great websites are more than just code — they're digital experiences that connect businesses with their customers. Every project we take on is an opportunity to create something meaningful and impactful.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex -space-x-2">
                      {["👨‍💻", "👩‍🎨", "👨‍🔧", "👩‍💼"].map((emoji, idx) => (
                        <div key={idx} className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white border-2 border-white">
                          {emoji}
                        </div>
                      ))}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-bold text-gray-900">10+</span> Team Members
                    </div>
                  </div>
                </>
              )}

              {activeTab === "mission" && (
                <>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                    Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Mission & Vision</span>
                  </h2>
                  <div className="space-y-8">
                    <div className="p-6 bg-blue-50 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-3 text-blue-600">Our Mission</h3>
                      <p className="text-gray-700 text-lg">
                        To empower businesses of all sizes with innovative digital solutions that drive growth, enhance user experience, and create lasting value in the digital landscape.
                      </p>
                    </div>
                    <div className="p-6 bg-purple-50 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-3 text-purple-600">Our Vision</h3>
                      <p className="text-gray-700 text-lg">
                        To become India's most trusted digital partner, known for delivering exceptional quality, innovative solutions, and measurable results for our clients.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "values" && (
                <>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                    Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Core Values</span>
                  </h2>
                  <div className="space-y-4">
                    {[
                      { title: "Innovation First", desc: "We stay ahead of technology trends to deliver cutting-edge solutions." },
                      { title: "Quality Matters", desc: "We never compromise on code quality, design, or user experience." },
                      { title: "Client Success", desc: "Your success is our success. We're committed to exceeding expectations." },
                      { title: "Transparency", desc: "Clear communication and honest feedback throughout our partnership." },
                    ].map((value, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{value.title}</h3>
                          <p className="text-gray-600">{value.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <img loading="lazy" decoding="async"
                src="/business/about.e53576171cd6.webp"
                alt="About Us"
                className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Team</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              The creative minds and technical experts behind your successful projects
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Purusottam Kumar",
                role: "Founder & Lead Developer",
                bio: "Full-stack developer with 8+ years of experience in web technologies.",
                image: "👨‍💻",
                social: [
                  { icon: "🔗", link: "https://portfoliowebpk.netlify.app/" },
                  { icon: "💼", link: "#" },
                  { icon: "📧", link: "#" },
                ]
              },
              {
                name: "Shyam Kumar Singh",
                role: "UI/UX Designer",
                bio: "Creative designer passionate about creating beautiful user experiences.",
                image: "🎨",
                social: [
                  { icon: "🔗", link: "#" },
                  { icon: "💼", link: "#" },
                  { icon: "📧", link: "#" },
                ]
              },
              {
                name: "Ujjwal Kumar",
                role: "Backend Expert",
                bio: "Specializes in scalable architecture and database optimization.",
                image: "⚙️",
                social: [
                  { icon: "🔗", link: "#" },
                  { icon: "💼", link: "#" },
                  { icon: "📧", link: "#" },
                ]
              },
              {
                name: "Neha Gupta",
                role: "Project Manager",
                bio: "Ensures smooth project delivery and client satisfaction.",
                image: "📊",
                social: [
                  { icon: "🔗", link: "#" },
                  { icon: "💼", link: "#" },
                  { icon: "📧", link: "#" },
                ]
              }
            ].map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              What makes us different from other web development companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Delivery",
                desc: "We deliver projects on time without compromising on quality."
              },
              {
                icon: "💎",
                title: "Quality Assured",
                desc: "Clean code, responsive design, and thorough testing."
              },
              {
                icon: "🤝",
                title: "Client First",
                desc: "Your satisfaction is our top priority."
              },
              {
                icon: "💰",
                title: "Affordable",
                desc: "Competitive pricing without hidden costs."
              },
              {
                icon: "🔧",
                title: "Free Support",
                desc: "1 month free maintenance after project completion."
              },
              {
                icon: "📈",
                title: "SEO Ready",
                desc: "Websites optimized for search engines from day one."
              }
            ].map((item, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-slate-700/50 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-white">
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
                name: "Sandeep Verma",
                company: "TechStart Solutions",
                text: "Amazing team to work with! They understood our requirements perfectly and delivered beyond expectations.",
                rating: 5
              },
              {
                name: "Anjali Mehta",
                company: "Creative Studio",
                text: "The website they built for us is simply beautiful. Our customers love it and sales have increased!",
                rating: 5
              },
              {
                name: "Vikram Singh",
                company: "Local Business",
                text: "Professional, responsive, and talented. Highly recommend for any web development needs.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500">
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
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Got questions? We've got answers
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes your web development services different?",
                a: "We focus on clean code, responsive design, and SEO optimization from the start. Every project gets personalized attention and we don't use templates."
              },
              {
                q: "How long does it take to build a website?",
                a: "Timeline varies by project complexity. A basic business website takes 2-3 weeks, while e-commerce sites may take 4-6 weeks."
              },
              {
                q: "Do you provide website maintenance?",
                a: "Yes, we offer maintenance packages including updates, backups, security patches, and performance optimization."
              },
              {
                q: "What technologies do you use?",
                a: "We use modern tech stack including React, Next.js, Node.js, MongoDB, and Tailwind CSS for fast, scalable websites."
              },
              {
                q: "Do you require an advance payment?",
                a: "Yes, we typically require 50% advance to start the project, with the remaining 50% due upon completion."
              }
            ].map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 text-center px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you build an amazing website for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-blue-600 rounded-full
              hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => window.location.href = "tel:+919876543210"}
              className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold text-white border-2 border-white rounded-full
              hover:bg-white hover:text-blue-600 transition-all duration-500 hover:scale-110"
            >
              Call Us Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
