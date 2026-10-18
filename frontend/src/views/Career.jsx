"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const jobOpenings = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    location: "Remote / Hybrid",
    experience: "0–2 Years",
    type: "Full Time",
    salary: "₹3L - ₹6L PA",
    department: "Engineering",
    description: "We're looking for a passionate Frontend Developer to build amazing user interfaces using React and modern web technologies.",
    responsibilities: [
      "Develop responsive web applications using React.js",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Optimize components for maximum performance"
    ],
    requirements: [
      "Proficiency in React, JavaScript, and Tailwind CSS",
      "Understanding of responsive design principles",
      "Basic knowledge of version control (Git)",
      "Good problem-solving skills"
    ]
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    location: "Onsite / Remote",
    experience: "1–3 Years",
    type: "Full Time",
    salary: "₹4L - ₹8L PA",
    department: "Engineering",
    description: "Join our backend team to build scalable APIs and microservices using Node.js and MongoDB.",
    responsibilities: [
      "Design and implement RESTful APIs",
      "Work with databases like MongoDB and PostgreSQL",
      "Implement security and data protection measures",
      "Optimize applications for speed and scalability"
    ],
    requirements: [
      "Strong knowledge of Node.js and Express",
      "Experience with MongoDB or similar databases",
      "Understanding of authentication and authorization",
      "Knowledge of API design principles"
    ]
  },
  {
    id: 3,
    title: "UI / UX Designer",
    location: "Remote",
    experience: "0–2 Years",
    type: "Contract",
    salary: "₹3L - ₹5L PA",
    department: "Design",
    description: "We're seeking a creative UI/UX Designer to create beautiful and intuitive user experiences.",
    responsibilities: [
      "Create wireframes, prototypes, and mockups",
      "Conduct user research and usability testing",
      "Design responsive web and mobile interfaces",
      "Collaborate with developers on implementation"
    ],
    requirements: [
      "Proficiency in Figma or similar design tools",
      "Understanding of user-centered design principles",
      "Portfolio demonstrating UI/UX projects",
      "Basic knowledge of HTML/CSS"
    ]
  },
  {
    id: 4,
    title: "Full Stack Developer (MERN)",
    location: "Hybrid",
    experience: "2–4 Years",
    type: "Full Time",
    salary: "₹6L - ₹12L PA",
    department: "Engineering",
    description: "Looking for an experienced Full Stack Developer to lead projects and mentor junior developers.",
    responsibilities: [
      "Develop end-to-end web applications using MERN stack",
      "Architect scalable and maintainable solutions",
      "Review code and mentor team members",
      "Collaborate with clients on technical requirements"
    ],
    requirements: [
      "Strong experience with MERN stack",
      "Knowledge of cloud platforms (AWS/Azure)",
      "Experience with Agile development",
      "Excellent communication skills"
    ]
  },
];

const benefits = [
  {
    icon: "🏠",
    title: "Remote Work",
    description: "Work from anywhere with our flexible remote-first culture"
  },
  {
    icon: "📚",
    title: "Learning Budget",
    description: "Annual budget for courses, books, and conferences"
  },
  {
    icon: "💪",
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family"
  },
  {
    icon: "⏰",
    title: "Flexible Hours",
    description: "Choose your working hours, focus on delivery"
  },
  {
    icon: "🎉",
    title: "Team Events",
    description: "Regular team outings, celebrations, and fun activities"
  },
  {
    icon: "📈",
    title: "Growth Path",
    description: "Clear career progression and mentorship programs"
  }
];

const Career = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    currentCompany: "",
    noticePeriod: "",
    resume: null,
    coverLetter: "",
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

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, position: job.title });
    setShowApplicationForm(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job application:", formData);
    alert(`Application submitted for ${formData.position}! We'll review your application and get back to you within 3-5 working days.`);
    handleCloseForm();
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      currentCompany: "",
      noticePeriod: "",
      resume: null,
      coverLetter: "",
    });
  };

  return (
    <>
      {/* ================= HERO CAREER SECTION ================= */}
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-var(--navbar-height))] py-16 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/business/contact.0a850021d5d3.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`mb-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
              🚀 Join Our Growing Team
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Build
            </span>{" "}
            <span className="text-white">Your Future</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              With Us
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Join our growing team and work on exciting projects with modern
            technologies. We're looking for passionate people who want to make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => {
                document.getElementById('job-openings').scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
              transition-all duration-500 hover:scale-110 hover:shadow-2xl
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              View Openings
            </button>
            
            <button
              onClick={() => navigate("/contact")}
              className={`px-6 sm:px-12 py-4 sm:py-5 text-lg font-bold rounded-full text-white
              border-2 border-white/30 hover:border-white
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              transition-all duration-500 hover:scale-110
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Contact HR
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20">
            {[
              { number: "15+", label: "Team Members" },
              { number: "4", label: "Open Positions" },
              { number: "100%", label: "Remote Friendly" },
              { number: "5⭐", label: "Culture Rating" },
            ].map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-1000 delay-${index * 200} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY WORK WITH US ================= */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Why Work <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">With Us?</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We offer a collaborative environment, learning opportunities,
              and a chance to grow your career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl
                transition-all duration-700 hover:-translate-y-3
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CULTURE SECTION ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Culture</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                We believe in creating an environment where everyone can thrive and do their best work.
              </p>
              
              <div className="space-y-4">
                {[
                  "🤝 Collaborative & Supportive",
                  "🌱 Continuous Learning",
                  "💡 Innovation First",
                  "⚖️ Work-Life Balance",
                  "🎯 Goal Oriented",
                  "🌈 Inclusive Environment",
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-white">
                    <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["👨‍💻", "👩‍🎨", "👨‍🔧", "👩‍💼", "🧑‍🚀", "👩‍⚕️"].map((emoji, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-3">{emoji}</div>
                  <div className="text-white font-semibold">Team Member</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOB OPENINGS ================= */}
      <section id="job-openings" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Current <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Openings</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Find your next role and join our team of innovators
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div
                key={job.id}
                className="group bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                        {job.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.experience}
                      </span>
                      <span className="flex items-center font-semibold text-green-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.salary}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    {/* Quick view toggle */}
                    <details className="group/details">
                      <summary className="text-blue-600 cursor-pointer font-semibold list-none">
                        View Details
                      </summary>
                      <div className="mt-4 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-2">Responsibilities:</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start text-gray-600">
                                <span className="text-blue-600 mr-2">•</span>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Requirements:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start text-gray-600">
                                <span className="text-blue-600 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>

                  <div className="lg:text-right">
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-8 py-4 font-semibold text-white rounded-xl
                      bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                      hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
                      transition-all duration-300 hover:scale-105 shadow-lg
                      whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPLICATION FORM POPUP ================= */}
      {showApplicationForm && (
        <div className="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[calc(100dvh-var(--navbar-height)-2rem)] overflow-y-auto shadow-2xl transform animate-slideUp">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white relative">
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h3 className="text-3xl font-bold mb-2">Apply for {selectedJob?.title}</h3>
              <p className="text-white/90">Fill in your details below and we'll get back to you soon</p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
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
                  <label className="text-sm font-semibold text-gray-700">Years of Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  >
                    <option value="">Select experience</option>
                    <option value="fresher">Fresher (0 years)</option>
                    <option value="1-2">1-2 years</option>
                    <option value="2-4">2-4 years</option>
                    <option value="4-6">4-6 years</option>
                    <option value="6+">6+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Current Company</label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Current/Last company"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Notice Period *</label>
                  <select
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  >
                    <option value="">Select notice period</option>
                    <option value="immediate">Immediate</option>
                    <option value="15-days">15 days</option>
                    <option value="30-days">30 days</option>
                    <option value="45-days">45 days</option>
                    <option value="60-days">60 days</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Upload Resume * (PDF/DOC)</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Cover Letter / Additional Information</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                  placeholder="Tell us why you're interested in this position..."
                ></textarea>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 rounded-xl text-white font-bold text-lg
                  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                  hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
                  hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="py-4 px-8 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CTA ================= */}
      <section className="py-20 text-center px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future openings.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-blue-600 rounded-full
            hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl"
          >
            Send Open Application
          </button>
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

export default Career;