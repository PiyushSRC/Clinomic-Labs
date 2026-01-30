import React, { useState, useEffect } from 'react';

const steps = [
  { label: "CBC Performed", desc: "Routine CBC is processed as part of standard laboratory workflow." },
  { label: "Data Integration", desc: "CBC parameters are securely ingested from LIS or analyzers (HL7 / CSV)." },
  { label: "Clinical Pattern Evaluation", desc: "Validated red-cell indices and composite markers are analyzed." },
  { label: "Risk Stratification", desc: "Samples are classified as Low, Moderate, or High B12 risk." },
  { label: "Result Presentation", desc: "A clear risk flag and interpretive comment are appended to the CBC report." }
];

const ProductSection: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<null | { risk: string, color: string, details: string }>(null);

  // Base data configuration with numeric values for randomization
  const basePatientData = [
    { l: "WBC", v: 6.42, u: "10⁹/L", p: 2 },
    { l: "Lymph#", v: 1.85, u: "10⁹/L", p: 2 },
    { l: "Mid#", v: 0.52, u: "10⁹/L", p: 2 },
    { l: "Gran#", v: 4.05, u: "10⁹/L", p: 2 },
    { l: "Lymph%", v: 28.8, u: "%", p: 1 },
    { l: "Mid%", v: 8.1, u: "%", p: 1 },
    { l: "Gran%", v: 63.1, u: "%", p: 1 },
    { l: "RBC", v: 3.82, u: "10¹²/L", p: 2 },
    { l: "HGB", v: 11.2, u: "g/dL", p: 1 },
    { l: "HCT", v: 34.5, u: "%", p: 1 },
    { l: "MCV", v: 102.4, u: "fL", p: 1 },
    { l: "MCH", v: 34.1, u: "pg", p: 1 },
    { l: "MCHC", v: 32.4, u: "g/dL", p: 1 },
    { l: "RDW-CV", v: 15.8, u: "%", p: 1 },
    { l: "RDW-SD", v: 52.1, u: "fL", p: 1 },
    { l: "PLT", v: 142, u: "10⁹/L", p: 0 },
    { l: "MPV", v: 10.8, u: "fL", p: 1 },
    { l: "PDW", v: 12.4, u: "", p: 1 },
    { l: "PCT", v: 0.15, u: "%", p: 2 },
    { l: "P-LCC", v: 42, u: "10⁹/L", p: 0 },
    { l: "P-LCR", v: 28.5, u: "%", p: 1 }
  ];

  const [patientData, setPatientData] = useState<{ l: string, v: string, u: string }[]>([]);

  // Function to generate random data based on base values
  const generateRandomData = () => {
    return basePatientData.map(item => {
      // Random variation between -10% and +10%
      const variation = 1 + (Math.random() * 0.2 - 0.1);
      const newValue = (item.v * variation).toFixed(item.p);
      return { l: item.l, v: newValue, u: item.u };
    });
  };

  // Initialize data on mount
  useEffect(() => {
    setPatientData(generateRandomData());
  }, []);

  const startSimulation = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            const results = [
              { risk: "HIGH RISK", color: "text-red-500", details: "Patterns strongly suggestive of B12 insufficiency. Clinical correlation recommended." },
              { risk: "MODERATE RISK", color: "text-yellow-500", details: "Early hematological signals detected. Consider follow-up B12/MMA testing." },
              { risk: "LOW RISK", color: "text-blue-400", details: "No significant clinical patterns of B12 insufficiency identified." }
            ];
            setScanResult(results[Math.floor(Math.random() * results.length)]);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  return (
    <div className="relative z-20 min-h-screen py-20 md:py-32 px-6 md:px-12 lg:px-24">
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
        .scan-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #60a5fa, transparent);
          box-shadow: 0 0 15px #60a5fa;
          width: 100%;
          position: absolute;
          z-index: 50;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 grid lg:grid-cols-2 gap-12 items-start reveal">
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

        {/* INTERACTIVE SIMULATOR */}
        <div className="mb-24 md:mb-40 reveal stagger-1">
          <div className="w-full">
            <div className="glass-effect p-8 md:p-12 rounded-[40px] border border-white/20 relative overflow-hidden group hover:border-blue-400/30 transition-all duration-500">
              <div className="flex justify-between items-center mb-10">
                <div className="text-[10px] uppercase tracking-widest font-bold text-white/60">Sample Patient #8492</div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                </div>
              </div>

              <div className="space-y-4 relative">
                {isScanning && (
                  <div className="scan-line" style={{ top: `${scanProgress}%` }}></div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
                  {patientData.map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 group-hover:border-white/10 transition-colors">
                      <span className="text-[10px] md:text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{row.l}</span>
                      <span className="text-[10px] md:text-xs font-mono text-white flex gap-2">
                        {row.v} <span className="text-[9px] text-white/30">{row.u}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                {scanResult ? (
                  <div className="reveal revealed">
                    <div className={`text-xl md:text-2xl font-bold tracking-tighter ${scanResult.color} mb-2`}>{scanResult.risk}</div>
                    <p className="text-xs text-white/80 font-light leading-relaxed">{scanResult.details}</p>
                    <button onClick={() => {
                      setScanResult(null);
                      setPatientData(generateRandomData());
                    }} className="mt-6 text-[9px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors underline">Reset Scanner</button>
                  </div>
                ) : (
                  <button
                    disabled={isScanning}
                    onClick={startSimulation}
                    className={`w-full py-4 rounded-2xl border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest transition-all ${isScanning ? 'opacity-50' : 'hover:bg-blue-400/10 hover:border-blue-400 active:scale-95'}`}
                  >
                    {isScanning ? `Analyzing Pattern... ${Math.round(scanProgress)}%` : "Start Clinical Scan"}
                  </button>
                )}
                <p className="text-[10px] text-white/60 italic text-center mt-8">
                  *This simulation demonstrates the logic behind the Clinomic Labs risk stratification engine using all 21 hematological variables.
                </p>
              </div>
            </div>


          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-40">
          <div className="space-y-8 md:space-y-12 reveal-left">
            <div className="group">
              <h3 className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-4">The Clinical Gap</h3>
              <p className="text-white font-light text-[16px] md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                Vitamin B12 deficiency is highly prevalent and frequently underdiagnosed—especially in early stages where symptoms are subtle and anemia may be absent.
              </p>
            </div>
            <div className="group">
              <p className="text-white font-light text-[16px] md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                Although CBC tests are routinely performed, early hematological signals suggestive of B12 insufficiency are often missed or underutilized. Clinomic Labs addresses this gap by systematically analyzing CBC patterns that already exist in laboratory data.
              </p>
            </div>
          </div>

          <div className="glass-effect p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/10 hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-500 reveal-right stagger-1">
            <h3 className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8 text-center">System Characteristics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                "HL7 & CSV Secure Integration",
                "21 Parameter Analysis",
                "Validated Red-cell Indices",
                "Automated Pattern Recognition",
                "Report Appending Engine",
                "Population-wide Scalability"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group/item">
                  <svg className="w-3 md:w-4 h-3 md:h-4 text-blue-400 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[16px] md:text-xs text-white font-medium group-hover/item:text-blue-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mb-32 md:mb-48 reveal">
          <h3 className="text-center text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-12 md:mb-20">How Clinomic Labs Works</h3>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute top-[22px] md:top-[22px] lg:top-[24px] left-[10%] right-[10%] h-px hidden md:block pointer-events-none">
              <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(96, 165, 250, 0.1)" strokeWidth="1" />
                <line className="animate-dash" x1="0" y1="0" x2="100%" y2="0" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-2 lg:gap-4 md:px-2 lg:px-4">
              {steps.map((step, i) => (
                <div key={i} className={`relative z-10 flex flex-col items-center text-center group reveal stagger-${(i % 3) + 1}`}>
                  <div className="relative mb-6 md:mb-8">
                    <div className="w-10 h-10 md:w-11 lg:w-12 md:h-11 lg:h-12 rounded-full glass-effect border border-white/20 flex items-center justify-center text-xs md:text-[11px] lg:text-sm font-bold group-hover:border-blue-400 group-hover:scale-110 transition-all z-20 relative !bg-black">
                      {i + 1}
                    </div>
                    <div className="absolute inset-0 w-10 h-10 md:w-11 lg:w-12 md:h-11 lg:h-12 rounded-full border border-blue-400/30 pulse-glow z-10 group-hover:scale-125 transition-transform duration-500"></div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-[22px] md:top-[22px] lg:top-[24px] left-1/2 w-full hidden md:flex items-center justify-center -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-blue-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
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

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-20 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="reveal-left">
              <span className="text-blue-300 text-[10px] font-bold tracking-[0.4em] uppercase mb-6 md:mb-8 block">Future Roadmap</span>
              <h2 className="text-4xl md:text-6xl mb-8 md:mb-10 leading-[1.1]">
                <span className="font-bold text-white">Preventive Health</span> <br />
                <span className="text-2xl md:text-3xl font-light text-blue-400/80 uppercase tracking-widest block mt-2">(Upcoming)</span>
              </h2>
              <div className="space-y-6 md:space-y-8">
                <p className="text-white text-[16px] md:text-lg font-light leading-relaxed">
                  We are expanding the Clinomic intelligence engine to address critical gaps in preventive screening. By leveraging existing diagnostic panels, we aim to identify health risks earlier and more accurately.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { t: "Iron Deficiency & Anemia Patterns", d: "Early detection of latent iron deficiency before symptomatic presentation." },
                    { t: "Metabolic & Chronic Risk", d: "Screening for indicators of metabolic syndrome and long-term wellness gaps." },
                    { t: "Hormonal Health Signals", d: "Extracting subtle clinical markers from routine hematology and chemistry labs." }
                  ].map((item, idx) => (
                    <div key={idx} className="glass-effect p-6 rounded-2xl border border-white/20 hover:border-blue-400/40 hover:-translate-x-1 transition-all duration-500 group">
                      <div className="text-[16px] md:text-sm font-bold text-blue-300 uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">{item.t}</div>
                      <p className="text-[16px] md:text-xs text-white/80 font-light group-hover:text-white transition-colors">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative reveal-right stagger-1">
              <div className="glass-effect aspect-auto md:aspect-square min-h-[480px] rounded-[40px] md:rounded-[60px] border border-white/10 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group hover:border-blue-400/20 transition-all duration-700">
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-400/20 transition-all duration-1000"></div>

                <h3 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-center group-hover:text-white transition-colors">Screening at the <span className="font-medium">Point of Routine</span></h3>
                <p className="text-white/80 text-[16px] md:text-sm font-light text-center leading-relaxed mb-8 md:mb-12 group-hover:text-white transition-colors">
                  Our roadmap focuses on closing the screening gap globally by making preventive health insights a standard part of every annual lab visit.
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10 group-hover:border-white/20 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">Phase</span>
                    <span className="text-xs text-blue-300 font-medium">Research & Development</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10 group-hover:border-white/20 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">Primary Marker</span>
                    <span className="text-xs text-white">Ferritin & CBC Composite</span>
                  </div>
                  <div className="flex justify-between items-center py-3 group-hover:border-white/20 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">Integration</span>
                    <span className="text-xs text-white">Standard Multi-Analyzer</span>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <span className="inline-block px-6 py-2 rounded-full border border-blue-400/50 text-[9px] font-bold text-blue-300 uppercase tracking-[0.3em] group-hover:border-blue-400 group-hover:bg-blue-400/5 transition-all">Coming Q4 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;