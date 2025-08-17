import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Lazy load image component
const LazyImage = lazy(() => import('../../components/LazyImage.tsx'));

// Import language files
import enManage from '../data/text/en/manage.json';
import jaManage from '../data/text/ja/manage.json';
import zhManage from '../data/text/zh/manage.json';

const languageMap = {
  en: enManage,
  ja: jaManage,
  zh: zhManage,
};

interface ManageContent {
  title: string;
  subtitle: string;
  form: {
    title: string;
    festivalNameLabel: string;
    dateLabel: string;
    notificationLabel: string;
    notificationOptions: Array<{
      value: string;
      label: string;
    }>;
    submitButton: string;
    confirmationMessage: string;
  };
}

const Manage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<ManageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [festivalName, setFestivalName] = useState("");
  const [date, setDate] = useState("");
  const [notification, setNotification] = useState("");

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const content = languageMap[currentLanguage.code as keyof typeof languageMap];
      setPageContent(content);
    } catch {
      setPageContent(languageMap.en);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!festivalName || !date || !notification) return;

    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Reset form
    setFestivalName("");
    setDate("");
    setNotification("");
  };

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
        <p className="text-lg font-semibold text-white">Content not available</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900"></div>}>
      <div className="relative">
        
        {/* ✅ Popup Notification */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50"
            >
              <Bell className="w-5 h-5" />
              <span>{pageContent.form.confirmationMessage}</span>
              <button onClick={() => setShowPopup(false)}>
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              alt="Manage Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Manage+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
              style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
            >
              {pageContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto"
              style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
            >
              {pageContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Festival Reminder Form Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
              style={{ color: colors.textPrimary }}
            >
              {pageContent.form.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <Bell className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                  <h3 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
                    Set a Festival Reminder
                  </h3>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                        {pageContent.form.festivalNameLabel}
                      </label>
                      <input
                        type="text"
                        value={festivalName}
                        onChange={(e) => setFestivalName(e.target.value)}
                        placeholder="International Film Festival"
                        className="w-full p-2 border rounded-lg"
                        style={{ borderColor: colors.textSecondary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                        {pageContent.form.dateLabel}
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        style={{ borderColor: colors.textSecondary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                        {pageContent.form.notificationLabel}
                      </label>
                      <select
                        value={notification}
                        onChange={(e) => setNotification(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        style={{ borderColor: colors.textSecondary }}
                      >
                        <option value="">Select reminder time</option>
                        {pageContent.form.notificationOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: colors.primaryColor1 }}
                    >
                      {pageContent.form.submitButton}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Manage;
