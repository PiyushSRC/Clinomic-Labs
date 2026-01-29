import React from 'react';

const CompanyBackground: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-20 py-20 md:py-40 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <span className="text-blue-300 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 md:mb-6 block">ABOUT US</span>
        <img src="/arogya-logo-full.png" alt="Arogya BioX" className="h-[34px] md:h-[52px] lg:h-[64px] w-auto mb-8 md:mb-10 object-contain" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <h2 className="text-[30px] md:text-5xl lg:text-6xl font-light mb-8 md:mb-12 leading-tight tracking-tight">
              Transforming <span className="text-white font-medium italic">Routine Tests</span> <br className="hidden md:block" />
              into Screening Tools.
            </h2>
            <p className="text-white text-[16px] md:text-lg lg:text-xl font-light leading-relaxed mb-6 md:mb-8">
              Routine diagnostic tests contain far more clinical signal than is typically used. At Arogya BioX, we specialize in converting widely performed laboratory investigations into scalable screening tools.
            </p>

            <div className="space-y-4 md:space-y-6 text-white text-[16px] md:text-base font-light leading-relaxed">
              <p>Our platforms help laboratories, clinicians, and health systems identify risk earlier, at population scale, by working on top of existing lab workflows requiring no new equipment, no additional reagents, and no change in sample collection.</p>
              <p className="italic text-blue-300 text-[14px] md:text-sm font-medium">"We design every product as a clinical decision support system, not a diagnostic replacement."</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:gap-12">
            <div className="glass-effect p-6 md:p-10 rounded-3xl border border-white/20 hover:border-blue-400/30 hover:-translate-y-1 hover:bg-white/[0.04] transition-all duration-500 group">
              <h3 className="text-blue-300 text-[12px] font-bold uppercase tracking-widest mb-6 md:mb-8 group-hover:text-blue-400 transition-colors">Our Approach</h3>
              <ul className="space-y-4 md:space-y-5">
                {[
                  "Evidence-based clinical design",
                  "Transparent, interpretable outputs",
                  "Seamless LIS & analyzer integration",
                  "Built for high-volume, real-world deployment"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 md:gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)] shrink-0 group-hover/item:scale-125 transition-transform"></div>
                    <span className="text-[14px] md:text-base text-white font-light group-hover/item:text-blue-50 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-left group hover:scale-105 transition-transform duration-300">
                <div className="text-xl md:text-3xl font-light text-white mb-1">CDSS</div>
                <div className="text-[7px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold group-hover:text-blue-300 transition-colors">Platform</div>
              </div>
              <div
                onClick={() => scrollTo('contact')}
                className="text-left cursor-pointer group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-xl md:text-3xl font-light text-blue-400 mb-1 group-hover:text-white transition-colors">B12</div>
                <div className="text-[7px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold group-hover:text-blue-400">Primary</div>
              </div>
              <div className="text-left group hover:scale-105 transition-transform duration-300">
                <div className="text-sm md:text-lg lg:text-xl font-bold text-white mb-0.5 leading-tight">
                  Preventive Health<br />
                  <span className="text-[7px] md:text-[9px] text-white/80 uppercase tracking-widest font-bold">(Upcoming)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyBackground;