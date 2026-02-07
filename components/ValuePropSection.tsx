import React from 'react';

const ValuePropSection: React.FC = () => {
  const values = [
    {
      target: "Diagnostic Laboratories",
      benefits: [
        "Software-only enhancement",
        "No additional equipment or reagents",
        "Differentiated CBC reports",
        "Increased clinician engagement",
        "Supports reflex and follow-up testing"
      ]
    },
    {
      target: "Clinicians",
      benefits: [
        "Earlier visibility into possible deficiency",
        "Structured, interpretable risk insights",
        "Supports confirmatory testing decisions",
        "Improves preventive care conversations",
        "Data-driven patient interaction"
      ]
    },
    {
      target: "Health Systems",
      benefits: [
        "Scalable preventive screening",
        "Reduced late-stage complications",
        "Population-level health insights",
        "Optimized diagnostic pathways",
        "Improved health economic outcomes"
      ]
    }
  ];

  return (
    <div className="relative z-20 py-6 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="fluid-container section-container">
        <div className="text-center mb-12 md:mb-24">
          <span className="text-blue-300 text-label-2 md:text-label-1 font-bold tracking-[0.4em] uppercase mb-6 block font-heading">Value Proposition</span>
          <h2 className="text-fluid-heading font-light font-heading">Impact Across <span className="font-medium italic text-blue-300">Ecosystems</span></h2>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
          {values.map((v, i) => (
            <div key={i} className="glass-effect p-6 md:p-12 rounded-[40px] border border-white/10 md:hover:border-blue-400/30 md:hover:-translate-y-2 transition-all duration-500 flex flex-col group h-full">
              <h3 className="text-lg md:text-h3 font-medium mb-10 text-blue-300 group-hover:text-white transition-colors font-heading">{v.target}</h3>
              <ul className="space-y-6 flex-grow">
                {v.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-start gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 group-hover:bg-blue-400 group-hover/item:scale-125 transition-all shrink-0"></div>
                    <span className="text-fluid-body text-white/75 font-light group-hover:text-white/95 transition-colors leading-snug font-body">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuePropSection;