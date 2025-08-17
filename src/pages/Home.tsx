import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colors } from '../data/colors/theme';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';

// Lazy load components for better performance
const LazyImage = lazy(() => import('../components/LazyImage.tsx'));

// Import all language files statically
import enHome from '../data/text/en/home.json';
import jaHome from '../data/text/ja/home.json';
import zhHome from '../data/text/zh/home.json';

// Create a language map
const languageMap = {
  en: enHome,
  ja: jaHome,
  zh: zhHome
};

// Images array for use across pages
const images = {
  hero: 'https://static-assets.filmfreeway.com/assets/hero-7ab878b37b38d0ed096fcc2755a4263ce8006664e49d5c903c3870e527557872.avif',
  reviews: 'https://static-assets.filmfreeway.com/assets/home-driver@2x-068fd17eeb53c709c4e09a00af7b8e523f2f1c62cb2ea18a4c6a581e01270d60.avif',
  signup: 'https://static-assets.filmfreeway.com/assets/home-storytellers@2x-3ef47a195b4fcc9ffb553336c3b895754345dccadd5335ca9c2577317c998ff4.avif',
  gallery: [
    [
     'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/047/271/large/logo.jpg?1716421496' ,
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/005/387/large/logo.jpg?1714481098',
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/005/378/large/logo.jpg?1743414497',
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/024/426/large/logo.jpg?1704800279',
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/002/421/large/logo.jpg?1711754145',
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/006/798/large/logo.jpg?1610214871',
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/048/088/large/logo.jpg?1750953977',
 
        'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/048/088/large/logo.jpg?1750953977',
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/003/205/large/logo.jpg?1619675284',
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/045/447/large/logo.jpg?1675134191',
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/005/225/large/logo.jpg?1742508772',
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/002/131/large/logo.jpg?1725347695',
    ],
    [
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/007/813/large/logo.jpg?1739503708',
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/001/483/large/logo.jpg?1717087453',
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/006/966/large/logo.jpg?1705932693',  
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/006/162/large/logo.jpg?1696627924',  
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/006/149/large/logo.jpg?1750481416',  
            'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/065/889/large/logo.jpg?1646680811',  
             'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/045/447/large/logo.jpg?1675134191 ',
             'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/005/225/large/logo.jpg?1742508772', 
              'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/002/131/large/logo.jpg?1725347695',
              'https://filmfreeway-production-storage-01-connector.filmfreeway.com/festivals/logos/000/007/813/large/logo.jpg?1739503708',
       ]
  ]
};

interface HomeContent {
  page1: {
    title: string;
    subtitle: string;
    exploreButton: string;
  };
  page2: {
    title: string;
    trustedPartners?: string;
  };
  page3: {
    title: string;
    cards: Array<{
      title: string;
      content: string;
      link: string;
    }>;
  };
  page4: {
    title: string;
    reviews?: Array<{
      content: string;
      author: string;
    }>;
  };
  page5: {
    title: string;
    images?: string[][];
  };
  page6: {
    title: string;
    signUpButton: string;
  };
}

const defaultContent: HomeContent = {
  page1: {
    title: 'Discover Amazing Festivals',
    subtitle: 'Browse thousands of the world\'s top film festivals and contests.',
    exploreButton: 'Learn More'
  },
  page2: {
    title: 'Trusted by Industry Leaders',
    trustedPartners: 'https://static-assets.filmfreeway.com/assets/logos/dark_logo_row-1-731b394b2f694f0e63d4a09b52cf767e2e17092bb0a14da808ae4a5656a0086d.webp'
  },
  page3: {
    title: 'Explore Our Services',
    cards: [
      {
        title: 'Discover Amazing Festivals',
        content: 'Browse thousands of the world\'s top film festivals and contests.',
        link: '/festivals'
      },
      {
        title: 'The Smart and Easy Way to Submit',
        content: 'Add your project then click to submit. Simple and fast.',
        link: '/submit'
      },
      {
        title: 'Game Changing for Festivals and Contests',
        content: 'Receive entries, sell tickets, promote and manage your event.',
        link: '/manage'
      }
    ]
  },
  page4: {
    title: 'What Our Customers Say',
    reviews: [
      { content: 'FilmFreeway made submitting to festivals so easy and efficient!', author: 'Alex P.' },
      { content: 'The platform helped us manage our festival seamlessly.', author: 'Maria T.' },
      { content: 'A game-changer for discovering global film contests.', author: 'John K.' }
    ]
  },
  page5: {
    title: 'Festival Highlights',
    images: images.gallery
  },
  page6: {
    title: 'Join Our Community Today',
    signUpButton: 'Get Started'
  }
};

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<HomeContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        if (!content) {
          throw new Error('Content not found for selected language');
        }
        setPageContent({
          ...defaultContent,
          ...content,
          page5: { ...content.page5, images: images.gallery } // Ensure gallery images are always used
        });
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        setPageContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-800 to-gray-900" 
           style={{ backgroundColor: colors.backgroundLight }}>
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
      <div className="relative" style={{ backgroundColor: colors.backgroundDark }}>
        {/* Page 1: Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
          <motion.div 
      
      className="absolute inset-0 z-0"
          >
            <LazyImage 
              src={images.hero}
              alt="Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Hero+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6" 
                style={{ fontFamily: 'Old English Text MT, serif', textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)' }}
                aria-label={websiteInfo.name}
            >
              {websiteInfo.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-white font-light mb-10 max-w-2xl mx-auto" 
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              {pageContent.page1.subtitle}
            </h2>
            <Link 
              to="/signup" 
              className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colors.primaryColor1, color: colors.textLight }}
              aria-label={pageContent.page1.exploreButton}
            >
              {pageContent.page1.exploreButton} <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </section>

        {/* Page 2: Trusted Partners */}
        <section className="py-20 px-4" style={{ backgroundColor: colors.backgroundLight }}>
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12" 
              style={{ color: colors.textPrimary }}
            >
              {pageContent.page2.title}
            </motion.h2>
            <AnimatePresence>
              {pageContent.page2.trustedPartners ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {pageContent.page2.trustedPartners.split(',').map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                    >
                      <LazyImage 
                        src={partner.trim()}
                        alt={`Partner ${index + 1}`}
                        placeholder="https://via.placeholder.com/150x150?text=Partner+Logo"
                        className="w-full h-32 object-contain"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500"
                >
                  <p>No trusted partners available at the moment.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Page 3: Our Services */}

        {/* Page 3: Our Services - Fixed Version */}
        <section className="py-20 px-4" style={{ backgroundColor: colors.backgroundDark }}>
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12" 
              style={{ color: colors.textPrimary }}
            >
              {pageContent.page3.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {pageContent.page3.cards?.length ? (
                  pageContent.page3.cards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Link 
                        to={card.link} 
                        className="block h-full bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-80 transition-all duration-300 hover:scale-105 border border-gray-700"
                        aria-label={`Explore ${card.title}`}
                      >
                        <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                        <p className="text-gray-300 mb-4">{card.content}</p>
                        <div className="flex items-center text-primary-400 hover:text-primary-300 transition-colors">
                          <span>Learn more</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-3 text-center text-gray-400"
                  >
                    <p>No services available at the moment.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>


        {/* Page 4: Reviews */}
        <section className="relative py-20 px-4 min-h-[500px] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <LazyImage 
              src={images.reviews}
              alt="Reviews Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Reviews+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12" 
              style={{ color: colors.textLight }}
            >
              {pageContent.page4.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {pageContent.page4.reviews?.length ? (
                  pageContent.page4.reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-black bg-opacity-60 rounded-lg p-6 hover:bg-opacity-70 transition-all"
                    >
                      <p className="text-gray-300 italic mb-4">"{review.content}"</p>
                      <p className="text-white font-semibold">- {review.author}</p>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-2 text-center text-gray-400"
                  >
                    <p>No reviews available at the moment.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Page 5: Festivals Gallery */}
        <section className="py-20 px-4" style={{ backgroundColor: colors.backgroundLight }}>
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12" 
              style={{ color: colors.textPrimary }}
            >
              {pageContent.page5.title}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <AnimatePresence>
                {pageContent.page5.images?.length ? (
                  pageContent.page5.images.map((row, rowIndex) => (
                    row.map((image, imgIndex) => (
                      <motion.div
                        key={`${rowIndex}-${imgIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (rowIndex * 5 + imgIndex) * 0.1 }}
                      >
                        <LazyImage 
                          src={image}
                          alt={`Festival ${rowIndex * 5 + imgIndex + 1}`}
                          placeholder="https://via.placeholder.com/200x200?text=Festival+Image"
                          className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                    ))
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-5 text-center text-gray-500"
                  >
                    <p>No gallery images available at the moment.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Page 6: Sign Up Call to Action */}
        <section className="relative min-h-[400px] flex items-center justify-center px-4 py-20 overflow-hidden">
          <motion.div 
           
           className="absolute inset-0 z-0"
          >
            <LazyImage 
              src={images.signup}
              alt="Sign Up Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Sign+Up+Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
         
         className="relative z-10 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" 
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              {pageContent.page6.title}
            </h2>
            <Link 
              to="/signup" 
              className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colors.primaryColor1, color: colors.textLight }}
              aria-label={pageContent.page6.signUpButton}
            >
              {pageContent.page6.signUpButton} <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </section>
      </div>
    </Suspense>
  );
};

export default Home;