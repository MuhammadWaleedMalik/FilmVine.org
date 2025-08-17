import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { colors } from '../data/colors/theme';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';

// Lazy load image component
const LazyImage = lazy(() => import('../components/LazyImage.tsx'));

// Import all language files statically
import enMovies from '../data/text/en/movies.json';
import jaMovies from '../data/text/ja/movies.json';
import zhMovies from '../data/text/zh/movies.json';

// Create a language map
const languageMap = {
  en: enMovies,
  ja: jaMovies,
  zh: zhMovies,
};

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://static-assets.filmfreeway.com/assets/hero-7ab878b37b38d0ed096fcc2755a4263ce8006664e49d5c903c3870e527557872.avif";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface MoviesContent {
  title: string;
  subtitle: string;
}

const Movies: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<MoviesContent | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load language content
    const loadContent = () => {
      try {
        console.log(`Loading content for language: ${currentLanguage.code}`);
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        setPageContent(languageMap.en);
      }
    };

    // Fetch movies from TMDB API
    const fetchMovies = async () => {
      try {
        const { data: { results } } = await axios.get(`${url}/movie/popular?api_key=${apiKey}`);
        setMovies(results);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
    fetchMovies();
  }, [currentLanguage]);

  // Select a random movie for the hero background
  const randomMovie = movies[Math.floor(Math.random() * movies.length)] || null;

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
              alt="Movies Hero Background"
              placeholder="https://via.placeholder.com/1920x1080?text=Movies+Background"
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

        {/* Movies Section */}
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
              Featured Movies
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <LazyImage 
                      src={`${imgUrl}/${movie.poster_path}`}
                      alt={`${movie.title} Poster`}
                      placeholder="https://via.placeholder.com/400x600?text=Movie+Poster"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 
                        className="text-xl font-semibold mb-3"
                        style={{ color: colors.textPrimary }}
                      >
                        {movie.title}
                      </h3>
                      <p 
                        className="text-sm text-gray-600 mb-4 line-clamp-4"
                        style={{ color: colors.textSecondary }}
                      >
                        {movie.overview}
                      </p>
                      <Link
                        to={`/movie/${movie.id}`}
                        className="inline-flex items-center text-sm font-medium hover:underline"
                        style={{ color: colors.primaryColor1 }}
                        aria-label={`View details for ${movie.title}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Movies;