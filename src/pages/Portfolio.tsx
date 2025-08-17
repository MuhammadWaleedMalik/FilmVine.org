import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, Eye } from 'lucide-react';
import { colors } from '../data/colors/theme';

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Modern e-commerce platform with advanced features and seamless user experience.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      client: 'TechStore Inc.',
      year: '2024',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      category: 'Technology Solutions',
      description: 'Comprehensive healthcare management system for hospitals and clinics.',
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
      client: 'MedCare Solutions',
      year: '2024',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Financial Dashboard',
      category: 'Security Services',
      description: 'Secure financial dashboard with real-time analytics and reporting.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular', 'C#', 'SQL Server', 'Azure'],
      client: 'FinTech Corp',
      year: '2023',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Learning Management System',
      category: 'Web Development',
      description: 'Interactive learning platform with video streaming and progress tracking.',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['React', 'Express', 'MySQL', 'AWS'],
      client: 'EduTech Academy',
      year: '2023',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'IoT Monitoring Platform',
      category: 'Technology Solutions',
      description: 'Real-time IoT device monitoring and control platform.',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['React', 'Python', 'InfluxDB', 'MQTT'],
      client: 'SmartDevices Ltd',
      year: '2023',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Mobile Banking App',
      category: 'Security Services',
      description: 'Secure mobile banking application with biometric authentication.',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT'],
      client: 'SecureBank',
      year: '2022',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const categories = ['All', 'Web Development', 'Technology Solutions', 'Security Services'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: colors.backgroundLight }}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Our Portfolio
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Explore our latest projects and see how we've helped businesses achieve their goals through innovative solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 bg-white hover:bg-gray-50 shadow-md'
              }`}
              style={{
                backgroundColor: selectedCategory === category ? colors.primaryColor1 : undefined
              }}
            >
              <Filter size={16} className="inline mr-2" />
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
                  >
                    <Eye size={16} className="inline mr-2" />
                    View Details
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  {project.title}
                </h3>
                <p 
                  className="mb-4 line-clamp-2"
                  style={{ color: colors.textSecondary }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 rounded text-xs font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span
                      className="px-2 py-1 bg-gray-100 rounded text-xs font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    {project.year}
                  </span>
                  <div className="flex space-x-2">
                    <a
                      href={project.liveUrl}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="View Live"
                    >
                      <ExternalLink size={16} style={{ color: colors.primaryColor1 }} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="View Code"
                    >
                      <Github size={16} style={{ color: colors.primaryColor1 }} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  {selectedProject.title}
                </h2>
                <p 
                  className="mb-4"
                  style={{ color: colors.textSecondary }}
                >
                  {selectedProject.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: colors.textPrimary }}>
                      Client
                    </h4>
                    <p style={{ color: colors.textSecondary }}>{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: colors.textPrimary }}>
                      Year
                    </h4>
                    <p style={{ color: colors.textSecondary }}>{selectedProject.year}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                        style={{ color: colors.textSecondary }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a
                    href={selectedProject.liveUrl}
                    className="flex items-center px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primaryColor1 }}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Live
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    className="flex items-center px-6 py-3 border-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.primaryColor1, color: colors.primaryColor1 }}
                  >
                    <Github size={16} className="mr-2" />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;