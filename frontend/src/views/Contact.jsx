"use client";

import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        service: "",
        budget: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["India", "Available for remote meetings"],
      action: "Get Directions",
      link: "#"
    },
    {
      icon: "📧",
      title: "Email Us",
      details: ["internfy.in@gmail.com", "support@internfy.in.com"],
      action: "Send Email",
      link: "mailto:internfy.in@gmail.com"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
      action: "Call Now",
      link: "tel:+919876543210"
    },
    {
      icon: "💬",
      title: "Live Chat",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
      action: "Start Chat",
      link: "#"
    }
  ];

  const services = [
    "Web Development",
    "UI/UX Design",
    "Mobile App Development",
    "Training Programs",
    "Staffing Solutions",
    "Consulting"
  ];

  const budgets = [
    "Less than ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000+",
    "Need Custom Quote"
  ];

  return (
    <>
      {/* ================= HERO CONTACT SECTION ================= */}
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
              📞 We're Here to Help
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Get In
            </span>{" "}
            <span className="text-white">Touch</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              With Us
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Have a project in mind or need our services?  
            We'd love to hear from you. Reach out and let's create something amazing together.
          </p>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: "📧", label: "Email", value: "internfy.in@gmail.com" },
              { icon: "📞", label: "Phone", value: "+91 8757614978" },
              { icon: "💬", label: "WhatsApp", value: "+91 8757614978" },
              { icon: "⏰", label: "Response Time", value: "< 24 hours" },
            ].map((item, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition-all duration-1000 delay-${index * 200} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
                <div className="text-white font-semibold text-sm mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm mb-1">{detail}</p>
                ))}
                <a
                  href={info.link}
                  className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  {info.action} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Send Us a <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Message</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Info - Company Details */}
            <div
              className={`lg:col-span-1 space-y-6 transition-all duration-1000 ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
              }`}
            >
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  {[
                    "✅ 24/7 Support Available",
                    "✅ Free Consultation",
                    "✅ Quick Response Time",
                    "✅ Expert Team",
                    "✅ Satisfaction Guaranteed",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-3">✓</span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {["📘", "🐦", "📷", "🔗"].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 sm:p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Business Hours</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
              }`}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ✓ Thank you for contacting us! We'll get back to you soon.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Service Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select budget</option>
                      {budgets.map((budget, index) => (
                        <option key={index} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-700">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell us about your project, requirements, or any questions you have..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-gray-600 text-sm">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to being contacted
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-lg font-bold text-white rounded-full
                  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                  hover:from-green-500 hover:via-teal-500 hover:to-indigo-500
                  transition-all duration-500 hover:scale-105 shadow-xl
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Find Us <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Here</span>
            </h2>
            <p className="text-gray-600">Visit our office or connect with us online</p>
          </div>

          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-2xl font-bold mb-2">Our Location</h3>
              <p className="text-gray-600 mb-4">India (Remote & Hybrid Options Available)</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Questions</span>
            </h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How quickly do you respond to inquiries?",
                a: "We typically respond within 24 hours during business days. For urgent matters, please call us directly."
              },
              {
                q: "Do you offer free consultations?",
                a: "Yes! We offer a free 30-minute consultation to discuss your project requirements and provide initial recommendations."
              },
              {
                q: "Can you work with clients outside India?",
                a: "Absolutely! We work with clients globally and are comfortable with different time zones."
              },
              {
                q: "What information should I provide when contacting?",
                a: "The more details you can provide about your project, the better. Include your requirements, budget, timeline, and any specific questions you have."
              }
            ].map((item, index) => {
              const [open, setOpen] = useState(false);
              return (
                <div
                  key={index}
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
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you build something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => window.location.href = "tel:+919876543210"}
              className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold bg-white text-blue-600 rounded-full
              hover:bg-gray-100 transition-all duration-500 hover:scale-110 shadow-2xl"
            >
              Call Us Now
            </button>
            <button
              onClick={() => window.location.href = "mailto:info@yourcompany.com"}
              className="px-6 sm:px-14 py-4 sm:py-5 text-lg font-bold text-white border-2 border-white rounded-full
              hover:bg-white hover:text-blue-600 transition-all duration-500 hover:scale-110"
            >
              Email Us
            </button>
          </div>
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

export default Contact;