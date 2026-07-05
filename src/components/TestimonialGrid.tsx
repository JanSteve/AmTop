import { motion } from 'motion/react';
import { testimonialsData } from '../data';
import { Quote } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export default function TestimonialGrid() {
  // Sort testimonials for specific grid positions
  const tBugee = testimonialsData.find((t) => t.company === 'Bugee') || testimonialsData[0];
  const tStark = testimonialsData.find((t) => t.company === 'Stark Corp') || testimonialsData[1];
  const tFarrar = testimonialsData.find((t) => t.company === 'Farrar Publisher') || testimonialsData[2];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="py-24 bg-[#050505] relative border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span variants={itemVariants} className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
            CLIENT PARTNERS
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display font-light text-4xl md:text-5xl tracking-tight text-white mt-2">
            Trusted by brands who aren't afraid to stand out.
          </motion.h2>
        </div>

        {/* Elegant Grid Layout matching the custom mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Large testimonial Card (Bugee - 7 Cols) */}
          <motion.div
            id="testimonial-card-bugee"
            variants={itemVariants}
            className="lg:col-span-7 bg-[#111114] rounded-3xl p-8 md:p-12 border border-white/5 shadow-xs flex flex-col justify-between group hover:border-white/15 hover:shadow-2xl hover:shadow-white/1 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background quote aesthetic icon */}
            <Quote className="absolute right-10 top-10 w-24 h-24 text-white/2 group-hover:text-white/5 transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Massive growth metrics indicator */}
              <div className="flex flex-col mb-8">
                <span className="text-5xl sm:text-6xl font-display font-light text-white tracking-tight">
                  {tBugee.stat}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase mt-1">
                  {tBugee.statLabel}
                </span>
              </div>

              {/* Real deep quote */}
              <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 mb-10">
                “{tBugee.quote}”
              </p>
            </div>

            {/* Profile Row */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
              <img
                src={tBugee.avatarUrl}
                alt={`${tBugee.author}, ${tBugee.role}`}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-white/10"
              />
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">{tBugee.author}</p>
                <p className="text-xs text-zinc-400 font-medium">
                  {tBugee.role} at <span className="font-bold text-zinc-300">{tBugee.company}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right hand double column stacked (Stark & Farrar - 5 Cols) */}
          <motion.div variants={containerVariants} className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Stack 1: Stark Corp */}
            <motion.div
              id="testimonial-card-stark"
              variants={itemVariants}
              className="bg-[#111114] rounded-3xl p-8 border border-white/5 shadow-xs flex flex-col justify-between hover:border-white/15 hover:shadow-2xl hover:shadow-white/1 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-3xl font-display font-light text-white tracking-tight">
                    {tStark.stat}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-indigo-300 tracking-widest uppercase">
                    {tStark.statLabel}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300 mb-6 font-sans">
                  “{tStark.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <img
                  src={tStark.avatarUrl}
                  alt={`${tStark.author}, ${tStark.role}`}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <div className="leading-tight">
                  <p className="text-xs font-bold text-white">{tStark.author}</p>
                  <p className="text-[10px] text-zinc-400">
                    {tStark.role}, <span className="font-semibold text-zinc-300">{tStark.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stack 2: Farrar Publisher */}
            <motion.div
              id="testimonial-card-farrar"
              variants={itemVariants}
              className="bg-[#111114] rounded-3xl p-8 border border-white/5 shadow-xs flex flex-col justify-between hover:border-white/15 hover:shadow-2xl hover:shadow-white/1 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-3xl font-display font-light text-white tracking-tight">
                    {tFarrar.stat}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-indigo-300 tracking-widest uppercase">
                    {tFarrar.statLabel}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300 mb-6 font-sans">
                  “{tFarrar.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <img
                  src={tFarrar.avatarUrl}
                  alt={`${tFarrar.author}, ${tFarrar.role}`}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <div className="leading-tight">
                  <p className="text-xs font-bold text-white">{tFarrar.author}</p>
                  <p className="text-[10px] text-zinc-400">
                    {tFarrar.role}, <span className="font-semibold text-zinc-300">{tFarrar.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
