import React from 'react';

const steps = [
    { label: "CBC Performed", desc: "Routine CBC is processed as part of standard laboratory workflow." },
    { label: "Data Integration", desc: "CBC parameters are securely ingested from LIS or analyzers (HL7 / CSV)." },
    { label: "Clinical Pattern Evaluation", desc: "Validated red-cell indices and composite markers are analyzed." },
    { label: "Risk Stratification", desc: "Samples are classified as Low, Moderate, or High B12 risk." },
    { label: "Result Presentation", desc: "A clear risk flag and interpretive comment are appended to the CBC report." }
];

const DemoPageContent: React.FC = () => {
    return (
        <div className="relative z-20 pb-12 md:pb-20 px-6 md:px-12 lg:px-24">
            <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -16; }
        }
        .animate-dash {
          stroke-dasharray: 4, 4;
          animation: dash 1s linear infinite;
        }
        .pulse-glow {
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.2);
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      `}</style>

            <div className="max-w-[1600px] mx-auto w-full">
                {/* Intro Section: Current Product + How it interprets */}
                <div className="mb-12 md:mb-20 grid lg:grid-cols-2 gap-12 items-start animate-fade-in-up">
                    <div className="max-w-4xl">
                        <span className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 md:mb-6 block">Current Product</span>
                        <img src="/clinomic-labs-logo.png" alt="Clinomic Labs" className="w-[200px] md:w-[350px] mb-6 md:mb-8 object-contain" />
                        <p className="text-white text-[16px] md:text-lg lg:text-xl font-light leading-relaxed italic mb-6 md:mb-8 border-l border-blue-400/50 pl-4 md:pl-6">
                            "A Clinical Intelligence Platform by Arogya BioX"
                        </p>
                        <div className="space-y-4 md:space-y-6 text-white font-light text-[16px] md:text-lg max-w-3xl">
                            <p>
                                Clinomic Labs is a laboratory-integrated clinical intelligence platform that enables Vitamin B12 deficiency risk screening using routine CBC data.
                            </p>
                            <p>
                                It identifies hematological patterns associated with possible B12 insufficiency and presents a Low / Moderate / High risk flag, prompting timely clinical correlation and confirmatory testing.
                            </p>
                        </div>
                    </div>

                    <div className="glass-effect p-8 rounded-[32px] border border-white/10 hover:border-blue-400/20 hover:-translate-y-1 transition-all duration-500 mt-8 lg:mt-16">
                        <h4 className="text-blue-300 text-[12px] font-bold uppercase tracking-widest mb-4">How it interprets</h4>
                        <p className="text-[16px] md:text-sm text-white/80 font-light leading-relaxed mb-6">
                            Our engine doesn't just look for "high" or "low" numbers. It evaluates the <strong>morphological signature</strong> of blood cells across 21 standard parameters.
                        </p>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                <span className="text-[14px] md:text-[11px] text-white/90">Macro-ovalocytic trends in MCV & RBC indices</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                <span className="text-[14px] md:text-[11px] text-white/90">Subtle changes in anisocytosis (RDW-CV/SD)</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                <span className="text-[14px] md:text-[11px] text-white/90">Secondary signatures in WBC/Platelet distributions</span>
                            </div>
                        </div>
                    </div>
                </div>



                {/* How Clinomic Labs Works */}
                <div className="relative animate-fade-in-up">
                    <h3 className="text-center text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-12 md:mb-20">How Clinomic Labs Works</h3>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Dashed Line */}
                        <div className="absolute top-[22px] md:top-[22px] lg:top-[24px] left-[10%] right-[10%] h-px hidden md:block pointer-events-none">
                            <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none">
                                <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(96, 165, 250, 0.1)" strokeWidth="1" />
                                <line className="animate-dash" x1="0" y1="0" x2="100%" y2="0" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.5" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-2 lg:gap-4 md:px-2 lg:px-4">
                            {steps.map((step, i) => (
                                <div key={i} className={`relative z-10 flex flex-col items-center text-center group`}>
                                    <div className="relative mb-6 md:mb-8">
                                        <div className="w-10 h-10 md:w-11 lg:w-12 md:h-11 lg:h-12 rounded-full glass-effect border border-white/20 flex items-center justify-center text-xs md:text-[11px] lg:text-sm font-bold group-hover:border-blue-400 group-hover:scale-110 transition-all z-20 relative !bg-black">
                                            {i + 1}
                                        </div>
                                        <div className="absolute inset-0 w-10 h-10 md:w-11 lg:w-12 md:h-11 lg:h-12 rounded-full border border-blue-400/30 pulse-glow z-10 group-hover:scale-125 transition-transform duration-500"></div>
                                    </div>
                                    {/* Arrow for MD screens */}
                                    {i < steps.length - 1 && (
                                        <div className="absolute top-[22px] md:top-[22px] lg:top-[24px] left-1/2 w-full hidden md:flex items-center justify-center -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-blue-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Vertical dashed line for mobile */}
                                    {i < steps.length - 1 && (
                                        <div className="absolute top-[40px] bottom-[-48px] left-1/2 -translate-x-1/2 w-px md:hidden">
                                            <svg className="h-full w-2 overflow-visible" preserveAspectRatio="none">
                                                <line x1="4" y1="0" x2="4" y2="100%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
                                            </svg>
                                        </div>
                                    )}
                                    <h4 className="text-[13px] md:text-[9px] lg:text-xs font-bold mb-2 md:mb-3 tracking-wide text-white group-hover:text-blue-300 transition-colors uppercase md:h-8 flex items-center px-1 lg:px-4 leading-tight">{step.label}</h4>
                                    <p className="text-[18px] md:text-[9px] lg:text-[11px] text-white/80 font-light leading-relaxed max-w-[200px] md:max-w-[140px] lg:max-w-[160px] group-hover:text-white transition-colors">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default DemoPageContent;
