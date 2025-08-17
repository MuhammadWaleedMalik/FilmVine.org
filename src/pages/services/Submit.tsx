import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Lazy load image
const LazyImage = lazy(() => import('../../components/LazyImage.tsx'));

// Language files
import enSubmit from '../data/text/en/submit.json';
import jaSubmit from '../data/text/ja/submit.json';
import zhSubmit from '../data/text/zh/submit.json';

const languageMap = { en: enSubmit, ja: jaSubmit, zh: zhSubmit };

interface SubmitContent {
  title: string;
  subtitle: string;
  form: {
    title: string;
    festivalNameLabel: string;
    descriptionLabel: string;
    locationLabel: string;
    startDateLabel: string;
    endDateLabel: string;
    contactEmailLabel: string;
    submitButton: string;
  };
}

const Submit: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<SubmitContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [festivalName, setFestivalName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/festival/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: festivalName,
          description,
          location,
          startDate,
          endDate,
          contactEmail,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      const data = await res.json();
      setMessage('✅ Festival submitted successfully!');
      setFestivalName('');
      setDescription('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setContactEmail('');
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !pageContent) {
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

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900"></div>}>
      <div className="relative">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 overflow-hidden">
          <motion.div className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1 }}>
            <LazyImage
              src="https://static-assets.filmfreeway.com/assets/hero-7ab878b37b38d0ed096fcc2755a4263ce8006664e49d5c903c3870e527557872.avif"
              alt="Submit Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Submit+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div className="relative z-10 text-center max-w-4xl mx-auto" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{pageContent.title}</h1>
            <p className="text-xl md:text-2xl text-white font-light">{pageContent.subtitle}</p>
          </motion.div>
        </section>

        {/* Form */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.textPrimary }}>
              {pageContent.form.title}
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="flex items-center mb-4">
                <Film className="w-6 h-6 mr-3" style={{ color: colors.primaryColor1 }} />
                <h3 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
                  Register Your Festival
                </h3>
              </div>

              <input className="w-full p-2 border rounded-lg" placeholder={pageContent.form.festivalNameLabel}
                value={festivalName} onChange={(e) => setFestivalName(e.target.value)} />

              <textarea className="w-full p-2 border rounded-lg" placeholder={pageContent.form.descriptionLabel}
                value={description} onChange={(e) => setDescription(e.target.value)} rows={4}></textarea>

              <input className="w-full p-2 border rounded-lg" placeholder={pageContent.form.locationLabel}
                value={location} onChange={(e) => setLocation(e.target.value)} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="w-full p-2 border rounded-lg" placeholder={pageContent.form.startDateLabel}
                  value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input className="w-full p-2 border rounded-lg" placeholder={pageContent.form.endDateLabel}
                  value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>

              <input className="w-full p-2 border rounded-lg" placeholder={pageContent.form.contactEmailLabel}
                type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: colors.primaryColor1 }}
              >
                {submitting ? 'Submitting...' : pageContent.form.submitButton}
              </button>

              {message && <p className="mt-2 text-center">{message}</p>}
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Submit;
