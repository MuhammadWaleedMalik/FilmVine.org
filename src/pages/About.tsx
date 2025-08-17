import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { colors } from '../data/colors/theme';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';

// Lazy load image component
const LazyImage = lazy(() => import('../components/LazyImage.tsx'));

// Import all language files statically
import enAbout from '../data/text/en/about.json';
import jaAbout from '../data/text/ja/about.json';
import zhAbout from '../data/text/zh/about.json';

// Create a language map
const languageMap = {
  en: enAbout,
  ja: jaAbout,
  zh: zhAbout,
};

interface AboutContent {
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  values: { title: string; description: string }[];
  story: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    description: string;
    slogan: string;
  };
}

const About: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        console.log(`Loading content for language: ${currentLanguage.code}`);
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const icons = [Heart, Award, Users, Globe];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.primaryColor1 }}
        ></motion.div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <p className="text-lg font-semibold text-white">
          Content not available
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900"></div>}>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <LazyImage 
              src="https://static-assets.filmfreeway.com/assets/hero-7ab878b37b38d0ed096fcc2755a4263ce8006664e49d5c903c3870e527557872.avif"
              alt="About Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=About+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
              style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
              aria-label={pageContent.title}
            >
              {pageContent.title}
            </h1>
            <p 
              className="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto"
              style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
            >
              {pageContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {pageContent.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div 
                    className="text-4xl font-bold mb-3"
                    style={{ color: colors.primaryColor1 }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-base font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story and Mission Section */}
        <section className="py-16 px-4" style={{ backgroundColor: colors.backgroundDark }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg"
            >
              <h2 
                className="text-3xl font-bold text-white mb-6"
                style={{ color: colors.textLight }}
              >
                {pageContent.story.title}
              </h2>
              <div className="space-y-4">
                {pageContent.story.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="text-base text-gray-300"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg"
            >
              <h3 
                className="text-2xl font-bold text-white mb-4"
                style={{ color: colors.textLight }}
              >
                {pageContent.mission.title}
              </h3>
              <p 
                className="text-base text-gray-300 mb-6"
              >
                {pageContent.mission.description}
              </p>
              <div 
                className="border-l-4 pl-4"
                style={{ borderColor: colors.primaryColor1 }}
              >
                <p 
                  className="italic text-base text-white"
                  style={{ color: colors.textLight }}
                >
                  "{pageContent.mission.slogan}"
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
              style={{ color: colors.textPrimary }}
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageContent.values.map((value, index) => {
                const IconComponent = icons[index % icons.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: colors.primaryColor1 }}
                    >
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <h4 
                      className="text-lg font-semibold mb-2"
                      style={{ color: colors.textPrimary }}
                    >
                      {value.title}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default About;