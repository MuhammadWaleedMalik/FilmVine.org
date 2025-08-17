import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle } from 'lucide-react';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGroq } from '../../hooks/useGroq'; 

// Lazy load image component
const LazyImage = lazy(() => import('../../components/LazyImage.tsx'));

// Import all language files statically
import enFestivals from '../data/text/en/festivals.json';
import jaFestivals from '../data/text/ja/festivals.json';
import zhFestivals from '../data/text/zh/festivals.json';

// Create a language map
const languageMap = {
  en: enFestivals,
  ja: jaFestivals,
  zh: zhFestivals,
};

interface FestivalsContent {
  title: string;
  subtitle: string;
  howToUse: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  questionTypes: {
    title: string;
    examples: Array<{
      question: string;
      description: string;
    }>;
  };
  inquiryForm: {
    title: string;
    inputLabel: string;
    submitButton: string;
  };
}

const Festivals: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<FestivalsContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ State for inquiry input
  const [inquiry, setInquiry] = useState('');

  // ✅ Groq hook usage
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleSubmit = () => {
    if (!inquiry.trim()) return;
    fetchGroqResponse("Festival Inquiry:", inquiry);
  };

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
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <LazyImage 
              src="https://static-assets.filmfreeway.com/assets/hero-7ab878b37b38d0ed096fcc2755a4263ce8006664e49d5c903c3870e527557872.avif"
              alt="Festivals Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Festivals+Background"
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

        {/* How to Use Section */}
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
              {pageContent.howToUse.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {pageContent.howToUse.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <Search className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: colors.textPrimary }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p 
                      className="text-sm text-gray-600"
                      style={{ color: colors.textSecondary }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Types of Questions Section */}
        <section className="py-16 px-4" style={{ backgroundColor: colors.backgroundDark }}>
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
              style={{ color: colors.textPrimary }}
            >
              {pageContent.questionTypes.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {pageContent.questionTypes.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <HelpCircle className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: colors.textPrimary }}
                      >
                        {example.question}
                      </h3>
                    </div>
                    <p 
                      className="text-sm text-gray-300"
                      style={{ color: colors.textSecondary }}
                    >
                      {example.description}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
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
              {pageContent.inquiryForm.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="inquiry" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {pageContent.inquiryForm.inputLabel}
                  </label>
                  <textarea
                    id="inquiry"
                    placeholder="Ask about any film festival..."
                    className="w-full p-2 border rounded-lg"
                    style={{ borderColor: colors.textSecondary }}
                    rows={4}
                    aria-label={pageContent.inquiryForm.inputLabel}
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  style={{ backgroundColor: colors.primaryColor1 }}
                  aria-label={pageContent.inquiryForm.submitButton}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Loading..." : pageContent.inquiryForm.submitButton}
                </button>

                {/* ✅ Show response */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {response && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-800">
                    <strong>Answer:</strong> {response}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Festivals;
