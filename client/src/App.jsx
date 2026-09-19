import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import ToolPage from './pages/ToolPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

import { logEvent } from './lib/api.js';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    logEvent('page_view', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/:categorySlug" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
