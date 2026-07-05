import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { servicesData } from '../data';
import { Check, Sparkles, ChevronRight } from 'lucide-react';

interface ServicesProps {
  selectedServiceId: string;
  onServiceSelect: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 14,
    },
  },
};

export default function Services({ selectedServiceId, onServiceSelect }: ServicesProps) {
  const activeService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  return (
    <motion.section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="py-24 bg-[#050505] border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
              WHAT WE EXCEL AT
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight text-white mt-2">
              Our Services
            </h2>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-4 md:mt-0">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase flex items-center gap-1.5">
              Scroll or click tabs below
              <span className="inline-block animate-bounce h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
            </span>
          </motion.div>
        </div>

        {/* Dynamic Tab System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Tab Selection Panel (Left 4 cols) */}
          <motion.div variants={containerVariants} className="lg:col-span-4 flex flex-col gap-3">
            {servicesData.map((service) => {
              const isActive = service.id === activeService.id;
              return (
                <motion.button
                  variants={itemVariants}
                  id={`service-tab-btn-${service.id}`}
                  key={service.id}
                  onClick={() => onServiceSelect(service.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-[#111114] border-white/15 text-white shadow-lg shadow-white/1'
                      : 'bg-transparent border-white/5 text-white/50 hover:border-white/15 hover:bg-[#111114]/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute -right-4 -top-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"
                    ></motion.div>
                  )}
                  <div>
                    <h3 className="font-display font-light text-lg tracking-wide uppercase">
                      {service.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-1 ${isActive ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? 'text-white translate-x-1' : 'text-white/20 group-hover:translate-x-1 group-hover:text-white/60'
                  }`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active Detail Panel (Right 8 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 bg-[#111114] border border-white/5 rounded-3xl p-8 md:p-12 shadow-xs min-h-[420px] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Design detail background accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-950/10 rounded-full blur-2xl pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between gap-8"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 font-mono text-[9px] tracking-widest font-bold rounded-md uppercase mb-6">
                    <Sparkles className="w-3 h-3 text-zinc-300" />
                    {activeService.pillText || 'Premium Quality'}
                  </div>

                  <h3 className="font-display font-light text-2xl md:text-3xl tracking-wide text-white mb-4">
                    {activeService.detailedHeadline || `${activeService.title} SYSTEMS`}
                  </h3>
                  
                  <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                    {activeService.longDescription || `Our ${activeService.title.toLowerCase()} division is engineered to meet extreme architectural demands with high structural integrity and green materials.`}
                  </p>

                  <h4 className="text-[10px] font-mono font-bold text-white/40 tracking-widest uppercase mb-4">
                    WHAT’S INCLUDED
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeService.fullDetails?.map((detail, idx) => (
                      <motion.div
                        id={`service-detail-item-${idx}`}
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#0e0e11] border border-white/5"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                        <span className="text-sm font-medium text-zinc-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono font-bold text-white/40 tracking-widest uppercase">
                      READY FOR ARCHITECTURAL INTEGRATION
                    </span>
                  </div>
                  <button
                    id="service-cta-btn"
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[10px] font-mono font-bold tracking-widest text-white hover:text-zinc-300 transition-colors flex items-center gap-1 group cursor-pointer uppercase"
                  >
                    INQUIRE ABOUT THIS DIVISION
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}
