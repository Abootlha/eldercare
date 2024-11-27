import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Heart, User, FileText, Activity, Phone, Mail, MapPin } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            className="w-full h-full object-cover opacity-10"
            alt="Healthcare Background"
          />
        </div>
        <div className="relative z-10 text-center px-4" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Virtual Healthcare for You
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Providing comprehensive healthcare solutions with advanced tracking,
            sign language support, and secure medical data management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
          <button
              onClick={() => navigate('/login')}
              className="btn-primary animate-bounce"
            >
              Get Started
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="btn-secondary hover:scale-105 transform transition-transform"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<FileText className="w-12 h-12 text-blue-600" />}
              title="Report Missing Person"
              description="Quick and efficient system to report and track missing individuals with real-time updates and notifications. Our platform ensures immediate action and widespread awareness."
              delay={100}
            />
            <ServiceCard
              icon={<Activity className="w-12 h-12 text-blue-600" />}
              title="Sign Language System"
              description="Advanced sign language interpretation system using AI technology to bridge communication gaps. Real-time translation and learning resources available."
              delay={200}
            />
            <ServiceCard
              icon={<Heart className="w-12 h-12 text-blue-600" />}
              title="Medical Data Storage"
              description="Secure and accessible storage for all your medical records with encrypted protection. Easy sharing with healthcare providers and emergency access."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
                alt="Healthcare Professional"
              />
            </div>
            <div className="space-y-6" data-aos="fade-left">
              <Feature
                title="24/7 Support"
                description="Round-the-clock assistance for all your healthcare needs with dedicated professional support."
              />
              <Feature
                title="Secure Platform"
                description="Advanced encryption and security measures to protect your sensitive medical data and personal information."
              />
              <Feature
                title="Easy to Use"
                description="Intuitive interface designed for users of all ages with accessibility features and guided assistance."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6" data-aos="fade-right">
              <h3 className="text-2xl font-semibold">Get in Touch</h3>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <p>support@eldercare.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <p>123 Healthcare Street, Medical City, MC 12345</p>
              </div>
            </div>
            <form className="space-y-6" data-aos="fade-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// ServiceCard Component
const ServiceCard = ({ icon, title, description, delay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">{title}</h3>
    <p className="text-gray-700 text-center">{description}</p>
  </div>
);

// Feature Component
const Feature = ({ title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="text-blue-600">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

export default Landing;
