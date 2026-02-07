import React from 'react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollTo = (id: string) => {
    const isDemoPage = window.location.pathname.includes('/demo');
    if (isDemoPage) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close menu on click
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-sm">
      <div className="w-full px-6 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <button
          onClick={() => {
            const isDemoPage = window.location.pathname.includes('/demo');
            if (isDemoPage) {
              window.location.href = '/';
            } else {
              scrollTo('hero');
            }
          }}
          className="flex items-center gap-2 group"
          aria-label="Back to Home"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 transition-all duration-300 ease-out group-hover:scale-90 group-hover:border-white group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">
            <img src="/logo.png" alt="Arogya BioX" className="w-6 h-6 md:w-7 md:h-7 object-contain brightness-[100] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] transition-all" />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 rounded-full px-8 py-2 bg-black/50 backdrop-blur-md border border-white/5 whitespace-nowrap">
          {[
            { id: 'company', label: 'About us' },
            { id: 'solution', label: 'Clinomic Labs' },
            { id: 'value', label: 'Value' },
            { id: 'pricing', label: 'Commercial Model' },
            { id: 'contact', label: 'Contact' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="min-h-[48px] px-4 flex items-center text-white/80 hover:text-white transition-colors font-body text-cta-sm font-semibold uppercase tracking-widest"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-xl p-6 flex flex-col gap-6 animate-fade-in-down shadow-2xl">
          {[
            { id: 'company', label: 'About us' },
            { id: 'solution', label: 'Clinomic Labs' },
            { id: 'value', label: 'Value' },
            { id: 'pricing', label: 'Commercial Model' },
            { id: 'contact', label: 'Contact' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-white/80 hover:text-blue-400 text-left text-lg font-medium font-body py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;