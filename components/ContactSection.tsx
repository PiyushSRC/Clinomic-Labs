import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        alert('Thank you for contacting Arogya BioX. Our partnership team will respond within 24 hours.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }

      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error) || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      alert('Failed to send message. Please try again later or contact us directly via email.');
    } finally {
      // Reset status to idle after a delay if needed, or leave as is. 
      // For now, we'll leave it to allow the user to see the result state logic if we were using UI feedback, 
      // but since we are using alert, we clear loading.
      if (status !== 'success') setStatus('idle');
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    // If it's a placeholder link, prevent the default scroll-to-top behavior
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href === '#' || href === '') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative z-20 min-h-screen py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-t from-blue-900/5 to-transparent flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 md:gap-20 items-start">
        <div className="space-y-12 md:space-y-16">
          <h2 className="text-[56px] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[1] md:leading-[0.9]">
            Get <br />
            <span className="text-blue-300 font-medium">In Touch.</span>
          </h2>

          <p className="text-white/75 text-[18px] md:text-xl font-light max-w-md leading-relaxed">
            Let’s enable earlier detection—without changing how labs work.
          </p>

          <div className="space-y-8 md:space-y-12">
            <div className="group">
              <span className="text-[12px] md:text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 block">Product & Partnerships</span>
              <a href="mailto:contact@arogyabiox.com" className="text-[22px] sm:text-2xl md:text-4xl font-light text-white group-hover:text-blue-300 transition-colors duration-300 break-all leading-tight">
                contact@arogyabiox.com
              </a>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 md:p-14 rounded-[32px] md:rounded-[40px] border border-white/20 w-full">
          <span className="text-[10px] text-blue-400/80 uppercase tracking-[0.4em] font-bold mb-6 md:mb-8 block">Inquiry Form</span>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium ml-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="w-full bg-white/5 border border-white/20 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-sm text-white focus:outline-none focus:border-blue-400/50 transition-all placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium ml-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/20 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-sm text-white focus:outline-none focus:border-blue-400/50 transition-all placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium ml-1">Contact Number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: value });
                }}
                placeholder="Phone Number (10 digits)"
                className="w-full bg-white/5 border border-white/20 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-sm text-white focus:outline-none focus:border-blue-400/50 transition-all placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium ml-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help?"
                className="w-full bg-white/5 border border-white/20 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-sm text-white focus:outline-none focus:border-blue-400/50 transition-all placeholder:text-white/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 md:py-5 bg-blue-400 hover:bg-blue-500 disabled:bg-blue-400/50 disabled:cursor-not-allowed text-white rounded-xl md:rounded-2xl text-[10px] font-bold tracking-[0.3em] uppercase transition-all shadow-[0_10px_30px_rgba(96,165,250,0.2)] active:scale-[0.98]"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 flex justify-between items-center opacity-60">
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/arogyabiox"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSocialClick}
                aria-label="Follow us on X"
                className="hover:opacity-100 transition-opacity flex items-center justify-center w-4 h-4 text-white"
              >
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
            </div>
            <span className="text-[9px] md:text-[10px] leading-none uppercase tracking-[0.2em] font-medium text-white/80">&copy; 2025 Arogya BioX</span>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 text-center px-4 md:px-6">
        <p className="text-[16px] md:text-[10px] text-white/40 uppercase tracking-[0.3em] md:tracking-[0.4em] leading-relaxed max-w-5xl mx-auto">
          Clinomic Labs is a clinical decision support and screening tool intended to assist healthcare professionals. It does not replace laboratory diagnostic testing or professional medical judgment. All clinical decisions should be made by qualified healthcare providers.
        </p>
      </div>
    </div>
  );
};

export default ContactSection;