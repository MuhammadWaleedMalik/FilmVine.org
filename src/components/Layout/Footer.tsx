import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { websiteInfo } from '../../data/website/info';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Import all language files statically
import enFooter from './en/footer.json';
import jaFooter from './ja/footer.json';
import zhFooter from './zh/footer.json';

// Create a language map
const languageMap = {
  en: enFooter,
  ja: jaFooter,
  zh: zhFooter
};

interface FooterContent {
  brand: {
    nameAlt: string;
    slogan: string;
  };
  navigation: {
    title: string;
    links: { path: string; label: string }[];
  };
  legal: {
    title: string;
    links: { path: string; label: string }[];
  };
  contact: {
    title: string;
    info: { type: string; text: string }[];
  };
  social: {
    links: { name: string; link: string }[];
  };
  copyright: {
    text: string;
    privacy: string;
    terms: string;
  };
}

const Footer: React.FC = () => {
  const [pageContent, setPageContent] = useState<FooterContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const { primaryColor2, accent } = colors;

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
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

  if (isLoading || !pageContent) {
    return (
      <div className="w-full" style={{ backgroundColor: primaryColor2, height: '200px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" 
               style={{ borderColor: accent }}></div>
        </div>
      </div>
    );
  }

  const socialLinks = pageContent.social.links.map(social => ({
    ...social,
    icon: (
      social.name === 'Facebook' ? <Facebook size={20} /> :
      social.name === 'Instagram' ? <Instagram size={20} /> :
      social.name === 'LinkedIn' ? <Linkedin size={20} /> : null
    ),
    link: social.link === 'd' ? websiteInfo[social.name.toLowerCase() as keyof typeof websiteInfo] || '#' : social.link
  }));

  const quickLinks = pageContent.navigation.links;
  const legalLinks = pageContent.legal.links;
  const contactInfo = pageContent.contact.info.map(item => ({
    ...item,
    icon: item.type === 'mail' ? <Mail size={16} /> : item.type === 'phone' ? <Phone size={16} /> : <MapPin size={16} />
  }));

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-900 text-white py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Links and Images */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-gray-700">
          {/* Left - Navigation Links */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="hover:text-gray-300 transition-colors text-sm md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Images */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <img 
              src="https://www.wfcn.co/images/ISO_LOGO.webp" 
              alt="ISO Certified" 
              className="h-12 w-auto object-contain" 
            />
          </div>
        </div>

        {/* Bottom Row - Copyright and Branding */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          {/* Left - Legal Links */}
          <div className="mb-4 md:mb-0 order-2 md:order-1">
            <ul className="flex flex-wrap justify-center gap-4 text-xs">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center - Brand and Copyright */}
          <div className="mb-4 md:mb-0 order-1 md:order-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2">
                <img 
                  src={websiteInfo.logo} 
                  alt="WFCN Logo" 
                  className="w-10 h-10 mr-2" 
                />
                <span className="text-lg font-medium">{websiteInfo.name}</span>
              </div>
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} {websiteInfo.name}. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right - Social Links (if needed) */}
          <div className="order-3 hidden md:block">
            {/* Add social links here if needed */}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;