import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false); // Collapse after selection on mobile
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex items-center z-50 pointer-events-none">
      <div
        className="flex items-center gap-2 sm:gap-4 md:gap-6 pointer-events-auto group max-w-full"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Logo Button - Balanced size for mobile visibility */}
        <button
          onClick={() => scrollTo('hero')}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] rounded-full border border-white/10 flex items-center justify-center bg-white/5 cursor-pointer transition-colors duration-300 hover:border-white/40 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.5)] shrink-0 active:scale-90 group/logo"
          aria-label="Back to Home"
        >
          <img src="/logo.png" alt="Arogya BioX" className="w-full h-full object-contain transition-all duration-300 will-change-transform group-hover/logo:brightness-[100] group-hover/logo:drop-shadow-[0_0_15px_rgba(255,255,255,1)] group-hover/logo:scale-110" />
        </button>

        {/* Navigation Links - Ultra-minimal font size for maximum fit */}
        <div className={`
          flex items-center bg-black/90 backdrop-blur-2xl rounded-full border border-white/10 
          transition-all duration-500 ease-out flex-nowrap shrink
          overflow-x-auto scrollbar-hide
          
          /* Desktop Settings */
          md:opacity-100 md:translate-x-0 md:pointer-events-auto md:px-10 md:py-4 md:gap-10 md:max-w-none
          
          /* Mobile Spacing & Constraint: Highly optimized for small screen widths */
          gap-2 sm:gap-4 
          px-3.5 sm:px-5 
          py-2 sm:py-2.5
          max-w-[calc(100vw-55px)] sm:max-w-[calc(100vw-120px)]
          
          /* Mobile Visibility Logic */
          ${isExpanded ? 'opacity-100 translate-x-0 pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.6)]' : 'opacity-0 -translate-x-4 pointer-events-none md:opacity-100 md:translate-x-0 md:pointer-events-auto'}
        `}>
          {[
            { id: 'company', label: 'About us' },
            { id: 'solution', label: 'Clinomic Labs' },
            { id: 'value', label: 'Value' },
            { id: 'pricing', label: 'Commercial Model' },
            { id: 'contact', label: 'Contact' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={(e) => {
                e.stopPropagation();
                scrollTo(link.id);
              }}
              className="hover:text-blue-300 transition-colors uppercase tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.25em] text-[7.5px] sm:text-[9.5px] md:text-[11px] font-bold text-white whitespace-nowrap shrink-0"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;