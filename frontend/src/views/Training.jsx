"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const trainingData = [
  {
    title: "Frontend Development Training",
    desc: "Learn HTML, CSS, JavaScript, React, Tailwind CSS with real-world projects and best practices.",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "React.js Training",
    desc: "Master React fundamentals, hooks, routing, state management, and build production-ready apps.",
    icon: "⚛️",
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Full Stack Development",
    desc: "End-to-end MERN stack training with live projects, APIs, authentication, and deployment.",
    icon: "🌐",
    color: "from-green-500 to-teal-600",
  },
  {
    title: "UI / UX Design Training",
    desc: "Learn modern UI/UX principles, wireframing, prototyping, and responsive design techniques.",
    icon: "🎨",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Backend Development",
    desc: "Node.js, Express, MongoDB, REST APIs, security, and performance optimization training.",
    icon: "🛠️",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Interview & Placement Prep",
    desc: "Mock interviews, resume building, coding challenges, and real interview questions.",
    icon: "🎯",
    color: "from-yellow-500 to-orange-600",
  },
];

const Training = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const { push: navigate } = useRouter();

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

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, course: course.title });
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCourse(null);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert(`Thank you ${formData.name}! We'll contact you soon about ${formData.course}`);
    handleClosePopup();
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      message: "",
    });
  };

  return (
    <>
      {/* ================= HERO TRAINING SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/business/traning.026e6322a24e.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1
            className={`text-4xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Professional
            </span>{" "}
            <span className="text-white">Training</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Programs
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-200 mb-10 transition-all duration-1000 delay-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Industry-focused training programs designed to make you job-ready
            with real-world skills.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
            hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
            transition-all duration-500 hover:scale-110 hover:shadow-2xl
            relative overflow-hidden group"
          >
            <span className="relative z-10">Enroll Now</span>
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </section>

      {/* ================= TRAINING PROGRAMS ================= */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Our Training Programs
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Learn from experienced mentors with hands-on projects and
              practical knowledge.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(item)}
                className={`group bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl
                transition-all duration-700 hover:-translate-y-4 cursor-pointer
                relative overflow-hidden
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
                
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Click to Enroll</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Why Choose Our Training?
          </h2>
          <p className="text-slate-400 mb-16 max-w-3xl mx-auto text-lg">
            We focus on practical learning, real projects, and industry
            standards to help you succeed.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Live Projects", icon: "🚀", desc: "Work on real-world applications" },
              { title: "Expert Mentors", icon: "👨‍🏫", desc: "Learn from industry experts" },
              { title: "Career Guidance", icon: "🎯", desc: "Personalized career support" },
              { title: "Certification", icon: "📜", desc: "Get certified & recognized" },
            ].map((point, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 text-white hover:bg-slate-700/80 transition-all duration-500 hover:-translate-y-2 border border-slate-700 hover:border-blue-500"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{point.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-slate-400 text-sm">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Start Your Career with Us
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            Join our training programs and become industry-ready with confidence.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-blue-600 rounded-full
            hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl
            relative overflow-hidden group"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </button>
        </div>
      </section>

      {/* ================= ENROLLMENT POPUP FORM ================= */}
      {showPopup && (
        <div className="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[calc(100dvh-var(--navbar-height)-2rem)] overflow-y-auto shadow-2xl transform animate-slideUp">
            <div className={`p-8 bg-gradient-to-r ${selectedCourse?.color} text-white relative`}>
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="text-7xl mb-4 animate-bounce">{selectedCourse?.icon}</div>
              <h3 className="text-3xl font-bold mb-2">Enroll in {selectedCourse?.title}</h3>
              <p className="text-white/90">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Selected Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                  placeholder="Tell us about your background or any specific requirements..."
                ></textarea>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className={`flex-1 py-4 px-6 rounded-xl text-white font-bold text-lg
                    bg-gradient-to-r ${selectedCourse?.color} 
                    hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                >
                  Submit Enrollment
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="py-4 px-8 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default Training;