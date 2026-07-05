import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { X, Send, CheckCircle2, DollarSign, Sparkles, MessageSquare } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ClientHub from './components/ClientHub';
import AmbientParticles from './components/AmbientParticles';
import SectionDivider from './components/SectionDivider';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeServiceId, setActiveServiceId] = useState('create');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [isClientHubOpen, setIsClientHubOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Lock body scroll to avoid user interactions before content is fully ready
    document.body.style.overflow = 'hidden';

    let timer: ReturnType<typeof setInterval>;
    
    // Simulate initial loading progress smoothly
    timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 92) {
          clearInterval(timer);
          return 92; // Hold right before completion to await window load trigger or timeout
        }
        const step = Math.random() * 15 + 4;
        return Math.min(92, prev + step);
      });
    }, 120);

    const handleLoad = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = '';
      }, 800);
    };

    if (document.readyState === 'complete') {
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, 500);
      }, 1300);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', handleLoad);
      document.body.style.overflow = '';
    };
  }, []);

  // Inquiry form states
  const [selectedOperations, setSelectedOperations] = useState<string[]>(['EXTRUDE']);
  const [selectedBudget, setSelectedBudget] = useState('Residential Villa');
  const [message, setMessage] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const toggleOperation = (op: string) => {
    setSelectedOperations((prev) =>
      prev.includes(op) ? prev.filter((item) => item !== op) : [...prev, op]
    );
  };

  const handleServiceSelect = (id: string) => {
    setActiveServiceId(id);
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;

    setInquirySubmitting(true);
    setTimeout(() => {
      setInquirySubmitting(false);
      setInquirySubmitted(true);
      // Reset after success
      setTimeout(() => {
        setIsInquiryOpen(false);
        // Wait for drawer close animation before resetting content
        setTimeout(() => {
          setInquirySubmitted(false);
          setClientEmail('');
          setMessage('');
          setSelectedOperations(['EXTRUDE']);
          setSelectedBudget('Residential Villa');
        }, 300);
      }, 3500);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* Tactile physical noise overlay */}
      <div className="noise-overlay" />

      {/* Ambient background canvas particles */}
      <AmbientParticles />

      {/* Full-Screen Premium Entry Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="studio-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -40,
              transition: { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] 
              } 
            }}
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center text-black overflow-hidden select-none"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-zinc-200/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Elegant Letter-by-Letter Stagger Fade Entry */}
              <div className="flex overflow-hidden mb-6 items-baseline">
                {"amTOP".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.8,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="font-display font-light text-4xl md:text-6xl tracking-tight text-black"
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Brand dot */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="w-2.5 h-2.5 rounded-full bg-black mb-2 ml-1"
                />
              </div>

              {/* Minimal Progress Bar (1px thin) */}
              <div className="w-56 h-[1px] bg-black/10 relative overflow-hidden mb-4">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-black"
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeInOut", duration: 0.15 }}
                />
              </div>

              {/* Counter and status label in monospaced layout */}
              <div className="flex justify-between items-center w-56 text-[9px] font-mono tracking-widest text-zinc-500">
                <motion.span>
                  {loadingProgress < 30 ? (
                    "CONFIGURING SYSTEM GRID"
                  ) : loadingProgress < 60 ? (
                    "OPTIMIZING MOTION REELS"
                  ) : loadingProgress < 90 ? (
                    "PRE-RENDERING VISUALS"
                  ) : (
                    "ESTABLISHING GATEWAY"
                  )}
                </motion.span>
                <span className="font-bold text-black/80">
                  {Math.round(loadingProgress).toString().padStart(3, '0')}%
                </span>
              </div>
            </div>

            {/* Subtle bottom design detail */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-[0.4em] text-zinc-400 uppercase flex items-center gap-1.5">
              <span>ARCHITECTURAL PROFILE SYSTEM</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
              <span>EST. 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-agency-dark origin-left z-55 pointer-events-none"
        style={{
          scaleX,
        }}
      />

      {/* Header/Nav */}
      <Header 
        onContactClick={() => setIsInquiryOpen(true)} 
        onClientHubClick={() => setIsClientHubOpen(true)} 
      />

      {/* Hero Showcase */}
      <main>
        <Hero />

        <SectionDivider label="THE CHRONICLES" />

        {/* The Story Section */}
        <Story />

        <SectionDivider label="THE CAPABILITIES" />

        {/* Here's Everything You Get With amTop Section */}
        <Projects />

        <SectionDivider label="SYSTEM INTEGRITY" />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer / newsletter */}
      <Footer />

      {/* Interactive Studio Inquiry Drawer */}
      <AnimatePresence>
        {isInquiryOpen && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              id="inquiry-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-out Panel */}
            <motion.div
              id="inquiry-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-agency-bg border-l border-agency-dark/10 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 md:p-8 border-b border-agency-dark/5 flex items-center justify-between bg-white/50 backdrop-blur-xs sticky top-0 z-15">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold tracking-widest text-agency-dark/65 uppercase">
                    amTOP Architectural Profile Inquiry
                  </span>
                </div>
                <button
                  id="close-inquiry-drawer"
                  onClick={() => setIsInquiryOpen(false)}
                  className="p-2 rounded-full text-agency-dark/60 hover:text-agency-dark hover:bg-agency-dark/5 transition-colors cursor-pointer"
                  aria-label="Close inquiry panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Form / Success */}
              <div className="flex-grow p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {!inquirySubmitted ? (
                    <motion.form
                      id="studio-inquiry-form"
                      key="inquiry-form"
                      onSubmit={handleInquirySubmit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* intro intro */}
                      <div>
                        <h3 className="font-display font-black text-2xl tracking-tight text-agency-dark">
                          Let’s design your openings.
                        </h3>
                        <p className="text-xs text-agency-dark/60 mt-1">
                          Select custom profile systems and project scopes to request engineering specifications.
                        </p>
                      </div>

                      {/* Operations pillars */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-agency-dark/50 uppercase tracking-widest block">
                          uPVC PROFILE SYSTEMS (Select multiple)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['EXTRUDE', 'FABRICATE', 'SHIELD'].map((pill) => {
                            const isSelected = selectedOperations.includes(pill);
                            return (
                              <button
                                id={`inquiry-pill-btn-${pill}`}
                                type="button"
                                key={pill}
                                onClick={() => toggleOperation(pill)}
                                className={`py-3 rounded-xl border text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                                  isSelected
                                    ? 'bg-agency-dark border-agency-dark text-agency-bg shadow-sm'
                                    : 'bg-white border-agency-dark/5 text-agency-dark/70 hover:border-agency-dark/15 hover:bg-agency-bg'
                                }`}
                              >
                                {pill}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Budget Bracket */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-agency-dark/50 uppercase tracking-widest block">
                          ESTIMATED ALLOCATION
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Residential Villa', 'Multi-Storey Flat', 'Corporate Complex', 'Industrial Unit'].map((budget) => {
                            const isSelected = selectedBudget === budget;
                            return (
                              <button
                                id={`inquiry-budget-btn-${budget.replace(/[^a-zA-Z0-9]/g, '')}`}
                                type="button"
                                key={budget}
                                onClick={() => setSelectedBudget(budget)}
                                className={`py-3 px-4 rounded-xl border text-xs font-mono font-semibold text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-agency-dark border-agency-dark text-agency-bg shadow-sm'
                                    : 'bg-white border-agency-dark/5 text-agency-dark/70 hover:border-agency-dark/15 hover:bg-agency-bg'
                                }`}
                              >
                                <span>{budget}</span>
                                <DollarSign className={`w-3.5 h-3.5 ${isSelected ? 'text-agency-accent' : 'text-agency-dark/20'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Client email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry-email" className="text-[10px] font-mono font-bold text-agency-dark/50 uppercase tracking-widest">
                          EMAIL ADDRESS
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          placeholder="partner@brand.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="px-4 py-3 bg-white border border-agency-dark/5 rounded-xl text-sm text-agency-dark placeholder-agency-dark/30 focus:outline-hidden focus:border-agency-dark transition-colors"
                          required
                        />
                      </div>

                      {/* Client message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry-message" className="text-[10px] font-mono font-bold text-agency-dark/50 uppercase tracking-widest">
                          TELL US ABOUT YOUR PROJECT REQUIREMENTS
                        </label>
                        <textarea
                          id="inquiry-message"
                          rows={4}
                          placeholder="Briefly describe your window/door requirements, total openings count, color preferences, or glass specifications..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="px-4 py-3 bg-white border border-agency-dark/5 rounded-xl text-sm text-agency-dark placeholder-agency-dark/30 focus:outline-hidden focus:border-agency-dark transition-colors resize-none"
                        />
                      </div>

                      <button
                        id="inquiry-submit-btn"
                        type="submit"
                        disabled={inquirySubmitting}
                        className="w-full py-4 bg-agency-dark text-agency-bg rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 hover:bg-opacity-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {inquirySubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            DISPATCHING SPECIFICATION REQUEST...
                          </>
                        ) : (
                          <>
                            SUBMIT PROFILE REQUEST
                            <Send className="w-3.5 h-3.5 text-agency-accent" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      id="inquiry-success-panel"
                      key="success-panel"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-20 px-4"
                    >
                      <div className="relative mb-6">
                        <span className="absolute -inset-4 rounded-full bg-emerald-100 animate-ping"></span>
                        <CheckCircle2 className="w-16 h-16 text-emerald-600 relative z-10" />
                      </div>

                      <h3 className="font-display font-black text-2xl text-agency-dark tracking-tight">
                        Request Registered!
                      </h3>
                      
                      <p className="text-sm text-agency-dark/70 mt-3 leading-relaxed">
                        Excellent selection. Our engineering team is preparing custom CAD profiles and specs combining <span className="font-bold">{selectedOperations.join(', ')}</span> with your <span className="font-bold">{selectedBudget}</span> project scope.
                      </p>

                      <div className="mt-8 p-4 bg-agency-accent rounded-xl border border-agency-dark/5 text-left max-w-sm flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-agency-dark shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-agency-dark font-mono uppercase">ESTIMATED ENGINEERING RESPONSE</p>
                          <p className="text-xs text-agency-dark/85 mt-0.5">Our technical sales team typically responds via <span className="font-bold">{clientEmail}</span> in under 4 business hours.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Drawer Footer info */}
              <div className="p-6 bg-white/30 border-t border-agency-dark/5 text-[10px] font-mono text-agency-dark/40 flex items-center gap-2 justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SECURE END-TO-END WORKSPACE CONNECTION</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Client Workspace Hub */}
      <AnimatePresence>
        {isClientHubOpen && (
          <ClientHub onClose={() => setIsClientHubOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
