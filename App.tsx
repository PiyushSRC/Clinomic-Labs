import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleRing from './components/ParticleRing';
import Hero from './components/Hero';
import CompanyBackground from './components/CompanyBackground';
import ProductSection from './components/ProductSection';
import ValuePropSection from './components/ValuePropSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.NORMAL);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === AppMode.NORMAL ? AppMode.ACTIVE : AppMode.NORMAL);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Performance optimization: Stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle hash scrolling on initial load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto' });
          // Clear the hash so that a refresh stays at the top/home
          history.replaceState(null, '', window.location.pathname);
        }, 100);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 font-body">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }}></div>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] bg-blue-900/5 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[220px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="relative pb-0 md:pb-0">
        <section id="hero" className="relative min-h-screen overflow-hidden flex items-center scroll-mt-20 md:scroll-mt-24">
          <ParticleRing mode={mode} />
          <Hero onToggleMode={toggleMode} />
        </section>

        <section id="company" className="relative md:border-t md:border-white/10 scroll-mt-20 md:scroll-mt-24">
          <CompanyBackground />
        </section>

        <section id="solution" className="relative md:border-t md:border-white/10 scroll-mt-20 md:scroll-mt-24">
          <ProductSection />
        </section>



        <section id="value" className="relative md:border-t md:border-white/10 scroll-mt-20 md:scroll-mt-24">
          <ValuePropSection />
        </section>

        <section id="pricing" className="relative md:border-t md:border-white/10 scroll-mt-20 md:scroll-mt-24">
          <PricingSection />
        </section>

        <section id="contact" className="relative md:border-t md:border-white/10 scroll-mt-20 md:scroll-mt-24">
          <ContactSection />
        </section>
      </main>

      <div className="fixed top-[-50px] left-[-50px] w-96 h-96 bg-blue-500/5 blur-[160px] rounded-full pointer-events-none z-20"></div>
    </div>
  );
};

export default App;
// Re-build trigger