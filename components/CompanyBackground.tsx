import React from 'react';

const CompanyBackground: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-20 py-12 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column */}
          <div className="text-left">
            <span className="text-blue-400 text-small-label md:text-label-2 font-bold tracking-[0.4em] uppercase mb-8 block font-heading">ABOUT US</span>
            <img
              src="/arogya-logo-full.png"
              alt="Arogya BioX"
              className="h-[32px] md:h-[42px] w-auto mb-12 object-contain"
            />

            <h2 className="text-display-2 md:text-display-1 font-light mb-12 leading-[1.1] tracking-tight text-white font-heading">
              Transforming <br />
              <span className="font-medium italic text-white/90">Routine Tests</span> <br />
              into Screening Tools.
            </h2>

            <div className="space-y-8 text-white/80 text-body-1 lg:text-h3 font-light leading-relaxed max-w-xl font-body">
              <p>
                We specialize in converting widely performed laboratory investigations into scalable screening tools.
              </p>
              <p>
                Our platforms help laboratories, clinicians, and health systems identify risk earlier, at population scale, by working on top of existing lab workflows requiring no new equipment, no additional reagents, and no change in sample collection.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 mt-12 lg:mt-0">
            {/* Our Approach Card */}
            <div className="glass-effect p-12 rounded-[40px] border border-white/10 hover:border-blue-400/30 hover:bg-white/[0.04] transition-all duration-500 group">
              <h3 className="text-blue-300 text-small-label md:text-label-2 font-bold uppercase tracking-widest mb-10 font-heading">OUR APPROACH</h3>
              <ul className="space-y-6">
                {[
                  "Evidence-based clinical design",
                  "Transparent, interpretable outputs",
                  "Seamless LIS & analyzer integration",
                  "Built for high-volume, real-world deployment"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] shrink-0"></div>
                    <span className="text-body-2 md:text-body-1 text-white/90 font-light font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 px-4">
              <div className="flex flex-col gap-2">
                <div className="text-h2 md:text-h1 font-light text-white font-heading tracking-tight">CDSS</div>
                <div className="text-small-label md:text-label-2 text-white/50 font-bold uppercase tracking-[0.2em] font-heading">PLATFORM</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-h2 md:text-h1 font-light text-blue-400 font-heading tracking-tight">B12</div>
                <div className="text-small-label md:text-label-2 text-white/50 font-bold uppercase tracking-[0.2em] font-heading">PRIMARY</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-body-1 lg:text-h3 font-bold text-white font-heading tracking-tight leading-none pt-1">Preventive Health</div>
                <div className="text-small-label text-white/50 font-bold uppercase tracking-[0.1em] font-heading">(UPCOMING)</div>
              </div>
            </div>

            <p className="italic text-blue-300/60 text-small-label md:text-label-2 font-medium text-center font-body mt-4">
              "We design every product as a clinical decision support system, not a diagnostic replacement."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyBackground;