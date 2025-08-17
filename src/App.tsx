import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cookies from './pages/Cookies';
import Terms from './pages/Terms';
import MarketingPage from './pages/Marketing';
import Movies from './pages/Movies';
import FAQs from './pages/Faqs';
import Festivals from './pages/services/Festivals';
import Submit from './pages/services/Submit';
import Manage from './pages/services/Manage';
import Pricing from './pages/Pricing';
import PricingBasic from './pages/PricingBasic';
import PricingPro from './pages/PricingPro';
import PricingEnterprise from './pages/PricingEnterprice';
import DashboardC from './pages/DashboardC';


function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Routes>
                  <Route path ='/admin/*' element={<DashboardC />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blogs" element={<Blog />} />
                
                <Route path="/contact" element={<Contact />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/marketing" element={<MarketingPage />} />

 <Route path="pricing" element={<Pricing />} />
            <Route path="pricing/basic" element={<PricingBasic/>} />
            <Route path="pricing/pro" element={<PricingPro />} />
            <Route path="pricing/enterprise" element={<PricingEnterprise />} />


                <Route
                  path="/festivals"
                  element={
                  <ProtectedRoute>
                    <Festivals />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/submit"
                  element={
                  <ProtectedRoute>
                    <Submit />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage"
                  element={
                  <ProtectedRoute>
                    <Manage />
                  </ProtectedRoute>
                  }
                />
                

                </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;